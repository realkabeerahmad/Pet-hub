const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: String,
  Name: String,
  Address: String,
  Phone: String,
  TrackingId: String,
  TrackingService: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", OrderSchema);
