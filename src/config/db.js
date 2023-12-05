const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose
      .connect(process.env.DB_CONNETION_STRING.toString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db connected");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
