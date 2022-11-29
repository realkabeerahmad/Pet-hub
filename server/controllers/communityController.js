// Express JS used to create Routes
const express = require("express");

// Multer to upload files
const upload = require("../config/multer");

// UUID V4 for generation Link
const { v4: uuidv4 } = require("uuid");

// Pet Model Created using MongoDB
const User = require("../models/user");

// Pet Model Created using MongoDB
const Pet = require("../models/pet");

// Shelter Details Model
const shelter = require("../models/shelter");

// Adoption Form Model
const adoptionForm = require("../models/adoptionForm");
const user = require("../models/user");
const post = require("../models/post");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Add a Shelter
router.post("/addPost", (req, res) => {
  const { content, userId } = req.body;
  try {
    const Post = new post({ content: content, userId: userId });
    Post.save()
      .then(() => {
        res.send({ status: "success", message: "Post Successfull" });
      })
      .catch((err) => {
        res.send({ status: "failed", message: "Error Occured" });
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});
router.post("/addPost", (req, res) => {
  const { content, userId } = req.body;
  try {
    const Post = new post({ content: content, userId: userId });
    Post.save()
      .then(() => {
        res.send({ status: "success", message: "Post Successfull" });
      })
      .catch((err) => {
        res.send({ status: "failed", message: "Error Occured" });
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

module.exports = router;
