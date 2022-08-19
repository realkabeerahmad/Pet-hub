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

// Pet Walk Time Model Created using MongoDB
const PetWalkTime = require("../models/petWalkTime");

// Pet Meal Time Model Created using MongoDB
const PetMealTime = require("../models/petMealTime");
const { date } = require("joi");

// Using Router from Express JS to create exportable routes
const router = express.Router();

router.post("/addPet", upload.single("image"), (req, res) => {
  const obj = {
    userId: req.body.userId,
    name: req.body.petName,
    bio: req.body.bio,
    gender: req.body.gender,
    breed: req.body.breed,
    type: req.body.type,
    image: req.file.filename,
    passport: req.body.passport,
    dob: req.body.dob,
    Link: req.body.petName + uuidv4(),
  };
  try {
    User.findById({ _id: `"${obj.userId}"` }, (user, err) => {
      if (user) {
        const pet = new Pet(obj);
        pet
          .save()
          .then(() => {
            res.status(200).send({
              status: "SUCCESS",
              message: "Pet Successfully Registered",
            });
          })
          .catch((err) => {
            res.status(400).json({
              status: "FAILED",
              error: err.message,
            });
          });
      } else {
        res.status(404).json({
          status: "FAILED",
          error: "User Not Found",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

router.post("/addPetMealTime", (req, res) => {
  const { petId, time } = req.body;
  let h = time.slice(0, 2);
  let m = time.slice(3, 5);
  let hour = Number(h) * 100;
  let minute = Math.floor((Number(m) / 6) * 10);
  try {
    Pet.findById({ petId }, (pet, err) => {
      if (pet) {
        const MealTime = new PetMealTime(petId, hour, minute);
        console.log("here");
        MealTime.save()
          .then(() => {
            res
              .status(200)
              .send({ status: "SUCCESS", message: "Meal Time Added" });
          })
          .catch((err) => {
            res.status(400).send({ status: "FAILED", error: err.message });
          });
      } else {
        res.status(400).json({ status: "FAILED", error: "Pet Not Found" });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "FAILED", error: err.message });
  }
});
// Exporting Routes
module.exports = router;
