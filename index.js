const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User"); //객체를 반환하는 것이므로. {} 속 알맹이를 User로 가리키는 효과. User=Model{User}
const bodyParser = require("body-parser"); //body data를 parsing해서 req.body로 출력해줌
const mongoose = require("./lib/db.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//endpoint register
app.post("/register", (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에게 가져오면
  //그것들을 db에 넣어준다.
  const user = new User(req.body); //json으로 받는 경우

  //User 모델에 저장 (mongodb의 메소드)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
