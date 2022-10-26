// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Pet Schema
const GallerySchema = mongoose.Schema({
  petId: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Pet Model
module.exports = mongoose.model("gallery", GallerySchema);
