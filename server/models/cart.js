// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Cart Schema
const CartSchema = mongoose.Schema({
  userId: String,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Product Model
module.exports = mongoose.model("cart", CartSchema);
