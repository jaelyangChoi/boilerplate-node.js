const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    minlength: 5,
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
    type: Number,
  },
});

/* 함수의 스코프와 this
자바스크립트의 함수는 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받는다.
자바스크립트는 함수가 선언된 시점에서의 유효범위를 갖는다. (lexical scope)
arrow function을 쓰면 상위 스코프의 this를 가리킴 -> 여기선 global
*/

//저장 전에 비밀번호 암호화
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
  }
});
//모델: 스키마를 통해 만드는 인스턴스
const User = mongoose.model("User", userSchema); //모델의 이름과 스키마

module.exports = { User }; //프로퍼티: User, 값: Model { User } 객체
