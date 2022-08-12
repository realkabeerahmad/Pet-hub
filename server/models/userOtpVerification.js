const mongoose = require("mongoose");

const userOTPSchema = new mongoose.Schema({
  userID: String,
  otp: String,
  createdAt: Date,
  expiredAt: Date,
});

module.exports = mongoose.model("UserOtpVerification", userOTPSchema);
