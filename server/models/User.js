const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");
/*
schema: 해당 컬렉션의 document에 어떤 종류의 값이 들어가는지 정의
schema는 document의 구조가 어떻게 생겼는지 알려주는 역할.
*/
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 4,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    //expiraton
    type: Number,
  },
});

/* 함수의 스코프와 this
자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받는다.
자바스크립트는 함수가 선언된 시점에서의 유효범위를 갖는다. (lexical scope)
arrow function을 쓰면 상위 스코프의 this를 가리킴 -> 여기선 global
*/

//저장 전에 비밀번호 암호화. 미들웨어이고 save()전에 호출되니까 next() 있어야 됨
userSchema.pre("save", function (next) {
  //메소드의 경우 this는 객체를 가리킨다.
  //자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받는다.
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err); //next:save()
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else next(); //next 없으면 여기서 머물게 된다.
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  //plainPassword를 암호화해서 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

//user._id를 이용해 token 생성. 보안을 위해 user._id를 노출시키지 않으려고.
userSchema.methods.generateToken = function (callback) {
  //jsonwebtoken을 이용해서 token을 생성하기
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  //user._id 와 'secretToken'을 합하여 token을 만든다.
  //-> 이후 'secretToken'을 복호화에 이용해 토큰으로부터 user._id 찾는다!!
  let oneHour = moment().add(1, "hour").valueOf();
  user.tokenExp = oneHour;
  user.token = token;

  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  let user = this;
  //토큰을 decode한다. -> user._id가 나온다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

/*
model: 스키마를 통해 만드는 인스턴스
model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는 프로그래밍 인터페이스를 정의
model을 사용하여 데이터를 데이터베이스에 저장하거나 조회 할 수 있다.
*/
const User = mongoose.model("User", userSchema); //모델의 이름과 스키마
//각 User 객체는 각자의 schema를 갖으며, userSchema를 이용해 객체화했으므로, userSchema의 메소드를 쓸 수 있다.
module.exports = { User }; //프로퍼티: User, 값: Model { User } 객체
//스키마(클래스 같은 것)->모델(프로그래밍 인터페이스)
//외부에서 프로그래밍 과정에 모델의 메소드 활용 -> 사실은 스키마에 붙인 메소드
