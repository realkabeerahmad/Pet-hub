// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Meal Time Schema
const PetMealTimeSchema = mongoose.Schema({
  petId: String,
  name: String,
  hour: { type: Number },
  minute: { type: Number },
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Meal Time Model
module.exports = mongoose.model("petMealTime", PetMealTimeSchema);
