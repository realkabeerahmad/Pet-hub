const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: String,
  Name: String,
  Address: String,
  Phone: String,
  status: String,
  TrackingId: String,
  TrackingService: String,
  OrderItems: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", OrderSchema);
