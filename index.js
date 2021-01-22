const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User"); //객체를 반환하는 것이므로. {} 속 알맹이를 User로 가리키는 효과. User=Model{User}
const bodyParser = require("body-parser"); //body data를 parsing해서 req.body로 출력해줌
const cookieParser = require("cookie-parser");
const mongoose = require("./lib/db.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//endpoint register
app.post("/register", (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에게 가져오면 db에 넣어준다.

  //그때 그때 user 모델 생성
  const user = new User(req.body); //json으로 받는 경우

  //model을 사용하여 데이터를 데이터베이스에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});

app.post("/login", (req, res) => {
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
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSucces: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
