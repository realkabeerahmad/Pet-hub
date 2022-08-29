// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Med Details Schema
const PetVetDetailsSchema = mongoose.Schema({
  petId: String,
  PreviousAppointment: Date,
  NextAppointment: Date,
  VetAddress: String,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Meal Time Model
module.exports = mongoose.model("petVetDetails", PetVetDetailsSchema);
