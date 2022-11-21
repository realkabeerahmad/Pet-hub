// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// User Schema
const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  cnic: String,
  age: Number,
  dob: Date,
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  Image: { type: String },
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
});
// Expoting User Model
module.exports = mongoose.model("users", UserSchema);
