// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Med Details Schema
const PetVaccinationDetailsSchema = mongoose.Schema({
  petId: String,
  previousDose: Date,
  nextDose: Date,
  VaccinationCenterAddress: String,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Meal Time Model
module.exports = mongoose.model(
  "petVaccinationDetails",
  PetVaccinationDetailsSchema
);
