// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Product Schema
const ProductSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  Image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
// Exporting Product Model
module.exports = mongoose.model("product", ProductSchema);
