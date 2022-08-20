// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Walk Time Schema
const PetWalkTimeSchema = mongoose.Schema({
  petId: String,
  name: String,
  hour: { type: Number },
  minute: { type: Number },
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Walk Time Model
module.exports = mongoose.model("petWalkTime", PetWalkTimeSchema);
