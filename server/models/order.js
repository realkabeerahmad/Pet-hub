const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: String,
  Name: String,
  Address: String,
  Phone: String,
  status: String,
  TrackingId: String,
  TrackingService: String,
  products: [
    {
      _id: String,
      name: String,
      Image: String,
      price: Number,
      quantity: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", OrderSchema);
