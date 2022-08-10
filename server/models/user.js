const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  Image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
