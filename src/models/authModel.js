const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  reset: {
    code: {
      type: String,
      default: null
    },
    time: {
      type: String,
      default: null
    }
  }
});

module.exports = mongoose.model("auth", AuthSchema);
