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

const petVaccinationDetails = require("../models/petVaccinationDetails");
const petVetDetails = require("../models/petVetDetails");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Add a Pet
router.post("/addPet", upload.single("image"), (req, res) => {
  // Getting Data
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
    Link: req.body.petName + "_" + uuidv4(),
  };
  try {
    // Check if user Exist
    User.findById({ _id: `"${obj.userId}"` }, (user, err) => {
      if (user) {
        // Create an obj to store in DB
        const pet = new Pet(obj);
        // Save obj in DB
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

// Show a Single Pet Details
router.get("/showPet", (req, res) => {
  var { petId } = req.body;
  try {
    Pet.findById({ petId }, (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Show All Pets of a User
router.get("/showAllPets", (req, res) => {
  var { userId } = req.body;
  try {
    Pet.find({ userId }, (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a Pet Meal Time
router.post("/addPetMealTime", (req, res) => {
  const { petId, name, time } = req.body;
  let hour = Number(time.slice(0, 2));
  let minute = Math.ceil((Number(time.slice(3, 5)) / 6) * 10);
  try {
    Pet.findById({ petId }, (pet, err) => {
      if (pet) {
        const MealTime = new PetMealTime({ petId, name, hour, minute });
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

// View a pets All Meal Times
router.get("/showAllMealTime", (req, res) => {
  var { petId } = req.body;
  try {
    PetMealTime.find({ petId }, (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        data.forEach((element) => {
          let min = Math.floor((Number(element.minute) / 10) * 6);
          element.minute = min;
        });
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a pet's Walk Time
router.post("/addPetWalkTime", (req, res) => {
  const { petId, name, time } = req.body;
  let hour = Number(time.slice(0, 2));
  let minute = Math.ceil((Number(time.slice(3, 5)) / 6) * 10);
  try {
    Pet.findById({ petId }, (pet, err) => {
      if (pet) {
        const WalkTime = new PetWalkTime({ petId, name, hour, minute });
        WalkTime.save()
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

// Show All Walk Times of a Pet
router.get("/showAllWalkTimes", (req, res) => {
  var { petId } = req.body;
  try {
    PetWalkTime.find({ petId }, (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        data.forEach((element) => {
          let min = Math.floor((Number(element.minute) / 10) * 6);
          element.minute = min;
        });
        res.status(200).send(data);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Pet Vaccination Details
router.post("/addPetVaccination", (req, res) => {
  const { petId, previousDate, nextDate, VaccinationAddress } = req.body;
  try {
    Pet.findById({ petId }, (pet, err) => {
      if (pet) {
        petVaccinationDetails.find({ petId }, (data, error) => {
          if (data) {
            res.status(400).send("Vaccination Details Already Exist");
          } else if (error) {
            res.status(500).send(error.message);
          } else {
            const details = new petVaccinationDetails({
              petId,
              previousDate,
              nextDate,
              VaccinationAddress,
            });
            details
              .save()
              .then(() => {
                res.status(200).send("Details Saved");
              })
              .catch((error) => {
                res.status(400).send(error.message);
              });
          }
        });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/getPetVaccination", (req, res) => {
  const { petId } = req.body;
  try {
    petVaccinationDetails.findById({ petId }, (details, err) => {
      if (details) {
        res.status(200).send(details);
      }
    });
  } catch (error) {}
});

// Add Pet Vet Details
router.post("/addPetVet", (req, res) => {
  const { petId, previousDate, nextDate, VetAddress } = req.body;
  try {
    Pet.findById({ petId }, (pet, err) => {
      if (pet) {
        petVaccinationDetails.find({ petId }, (data, error) => {
          if (data) {
            res.status(400).send("Vet Details Already Exist");
          } else if (error) {
            res.status(500).send(error.message);
          } else {
            const details = new petVetDetails({
              petId,
              previousDate,
              nextDate,
              VetAddress,
            });
            details
              .save()
              .then(() => {
                res.status(200).send("Details Saved");
              })
              .catch((error) => {
                res.status(400).send(error.message);
              });
          }
        });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// Exporting Routes
module.exports = router;
