// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Cart Schema
const CartSchema = mongoose.Schema({
  userId: String,
  products: [
    {
      _id: String,
      name: String,
      Image: String,
      price: String,
      quantity: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
// Exporting Product Model
module.exports = mongoose.model("cart", CartSchema);
