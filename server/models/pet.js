// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Schema
const PetSchema = mongoose.Schema({
  userId: String,
  shelterID: String,
  name: String,
  bio: String,
  gender: String,
  breed: String,
  type: String,
  image: String,
  passport: String,
  dob: Date,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Model
module.exports = mongoose.model("pets", PetSchema);
