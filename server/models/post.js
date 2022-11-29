// Using Mongoose for Mongoo DB
const mongoose = require("mongoose");
// Post Schema
const PostSchema = mongoose.Schema({
  userId: String,
  content: String,
  comments: [
    {
      userId: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
      default: [],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
// Expoting User Model
module.exports = mongoose.model("posts", PostSchema);
