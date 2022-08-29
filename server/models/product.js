// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Product Schema
const ProductSchema = mongoose.Schema({
  name: String,
  categoryId: String,
  quantity: Number,
  price: Number,
  description: String,
  Warranty: String,
  Return: String,
  StandardShipping: String,
  FastShipping: String,
  Image: String,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Product Model
module.exports = mongoose.model("product", ProductSchema);
