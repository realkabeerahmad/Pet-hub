// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Cart Item Schema
const CartItemSchema = mongoose.Schema({
  cartId: String,
  productId: String,
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
});
// Exporting Product Model
module.exports = mongoose.model("cartItem", CartItemSchema);
