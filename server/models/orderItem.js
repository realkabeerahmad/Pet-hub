const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
  orderId: String,
  productId: String,
  name: String,
  quantity: Number,
  price: Number,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", OrderSchema);
