const express = require("express");
const app = express();
const port = 5000;

const db_config = require("./config/mongoose.json");
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://jaelyang:${db_config.password}@boilerplate.rgdkh.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
