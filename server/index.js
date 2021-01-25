const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser"); //body data를 parsing해서 req.body로 출력해줌
const cookieParser = require("cookie-parser");
const mongoose = require("./lib/db"); //없으면 실행이 안됨
const { User } = require("./models/User"); //객체를 반환하는 것이므로. {} 속 알맹이를 User로 가리키는 효과. User=Model{User}
const { auth } = require("./middleware/auth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => res.send("안녕하세요~"));

//endpoint register
app.post("/api/users/register", (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 받아오면 db에 넣어준다.

  //그때 그때 user 모델 생성
  const user = new User(req.body); //json으로 받는 경우

  //model을 사용하여 데이터를 데이터베이스에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일이 DB에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });

    //있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //쿠키에 토큰을 저장한다.
        res
          .cookie("x_auth", user.token) //front->client로 response.header를 통해 전달됨.
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//로그인 -> 토큰 발급(쿠키) -> 인증
app.get("/api/users/auth", auth, (req, res) => {
  //auth: 토큰 일치 여부 확인하고 user의 정보를 req에 넣음
  //여기까지 왔다는 것은 미들웨어 auth를 통과했고 authentication이 true라는 것.
  res.status(200).json({
    _id: req.user._id, //response로 id 주는 거랑 쿠키로 id 주는 거랑 달라! res는 저장 안된다!
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//로그아웃 - DB의 토큰 삭제
//=>쿠키의 토큰과 일치하지 않아 인증 X -> 로그인 풀림
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
