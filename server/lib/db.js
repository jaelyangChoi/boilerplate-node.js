const config = require("../config/key.js");
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log(err));

module.exports = mongoose;
