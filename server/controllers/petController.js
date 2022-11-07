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

// Pet Vacination Details Model
const petVaccinationDetails = require("../models/petVaccinationDetails");

// Pet Vet Details Model
const petVetDetails = require("../models/petVetDetails");
const pet = require("../models/pet");
const gallery = require("../models/gallery");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Add a Pet
router.post("/addPet", upload.single("image"), (req, res) => {
  // Getting Data
  const obj = {
    userId: req.body.userId,
    name: req.body.name,
    bio: req.body.bio,
    gender: req.body.gender,
    breed: req.body.breed,
    type: req.body.type,
    image: req.file.filename,
    passport: req.body.passport,
    dob: req.body.dob,
    vaccination: { status: req.body.vaccinationStatus },
    rehome: false,
  };
  const _id = obj.userId;
  try {
    // Check if user Exist
    User.findById({ _id }, (err, user) => {
      if (user) {
        // Create an obj to store in DB
        const pet = new Pet(obj);
        // Save obj in DB
        pet
          .save()
          .then(() => {
            res.status(200).send({
              status: "success",
              message: "Pet Successfully Registered",
            });
          })
          .catch((err) => {
            throw Error("Unable to Register Pet\n" + err.message);
          });
      } else {
        throw Error("User Not Found");
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

// Show a Single Pet Details
router.get("/showPet", (req, res) => {
  var { petId } = req.body;
  try {
    Pet.findById({ petId }, (err, data) => {
      if (err) {
        throw Error(err.message);
      } else {
        res.status(200).json({
          status: "success",
          message: "data fetched successfully",
          data: data,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
});

// Show All Pets of a User
router.post("/showAllPets", (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  try {
    Pet.find({ userId }, (err, data) => {
      console.log(err);

      if (data !== [] || data !== null) {
        console.log(data);
        res.status(200).json({
          status: "success",
          message: "data fetched successfully",
          pets: data,
        });
      } else {
        res.json({
          status: "failed",
          message: "Pets not Found",
        });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
});

// Pet Rehome
router.post("/rehome", (req, res) => {
  var { petId } = req.body;
  try {
    pet.findByIdAndUpdate({ petId, rehome: true }, (err, data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Pet Rehomed Succefully",
          data: data,
        });
      }
      throw Error("Error Occured");
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
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
              .send({ status: "success", message: "Meal Time Added" });
          })
          .catch((err) => {
            throw Error(err.message);
          });
      } else {
        throw Error("Pet Not Found");
      }
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
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

// Delete Pet Meal Time
router.post("/deleteMealTime", (req, res) => {
  var { _id } = req.body;
  try {
    PetMealTime.findByIdAndDelete({ _id })
      .then(() => {
        res.send({ status: "success", message: "Meal Time Deleted" });
      })
      .catch(() => {
        throw Error("Could not Delete");
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
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

// Delete Walk Time
router.post("/deleteWalkTime", (req, res) => {
  var { _id } = req.body;
  try {
    PetWalkTime.findByIdAndDelete({ _id })
      .then(() => {
        res.send({ status: "success", message: "Meal Time Deleted" });
      })
      .catch(() => {
        throw Error("Could not Delete");
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// Add Pet Vaccination Details
router.post("/addVaccination", (req, res) => {
  const { _id, DoseDate, address, status } = req.body;
  console.log(req.body);
  try {
    Pet.updateOne(
      { _id: _id },
      {
        $set: {
          "vaccination.status": status,
          "vaccination.DoseDate": DoseDate,
          "vaccination.address": address,
          "vaccination.updatedAt": Date.now(),
        },
      }
    )
      .then(() => {
        res.send({ status: "success", message: "Vaccination Details Added" });
      })
      .catch((err) => {
        res.send({
          status: "failed",
          message: "Error Occured\n" + err.message,
        });
      });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
});

// Update Pet Vaccination Date
router.post("/updateVaccinationDate", (req, res) => {
  const { _id, DoseDate } = req.body;
  try {
    Pet.updateOne(
      { _id: _id },
      {
        $set: {
          "vaccination.DoseDate": DoseDate,
          "vaccination.updatedAt": Date.now(),
        },
      }
    )
      .then(() => {
        res.send({ status: "success", message: "Vaccination Date Updated" });
      })
      .catch((err) => {
        res.send({
          status: "failed",
          message: "Error Occured\n" + err.message,
        });
      });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
});

// Add Pet Vet Details
router.post("/addVet", (req, res) => {
  const { _id, AppointmentDate, address } = req.body;
  try {
    Pet.updateOne(
      { _id: _id },
      {
        $set: {
          "vet.AppointmentDate": AppointmentDate,
          "vet.address": address,
          "vet.updatedAt": Date.now(),
        },
      }
    )
      .then(() => {
        res.send({ status: "success", message: "Vet Details Added" });
      })
      .catch((err) => {
        res.send({
          status: "failed",
          message: "Error Occured\n" + err.message,
        });
      });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
});

// Update Pet Vaccination Date
router.post("/updateVetDate", (req, res) => {
  const { _id, AppointmentDate } = req.body;
  try {
    Pet.updateOne(
      { _id: _id },
      {
        $set: {
          "vet.AppointmentDate": AppointmentDate,
          "vaccination.updatedAt": Date.now(),
        },
      }
    )
      .then(() => {
        res.send({
          status: "success",
          message: "Vet Appointment Date Updated",
        });
      })
      .catch((err) => {
        res.send({
          status: "failed",
          message: "Error Occured\n" + err.message,
        });
      });
  } catch (err) {
    res.send({ status: "failed", message: err.message });
  }
});

// Upload Image to Gallery
router.post("/uploadImage", upload.single("image"), (req, res) => {
  const { petId } = req.body;
  const obj = { petId, image: req.file.filename };
  try {
    const Image = new gallery(obj);
    Image.save()
      .then(() => {
        res.send({ status: "success", message: "Image Saved Successfully" });
      })
      .catch((err) => {
        throw Error("Error Occoured\n", err.message);
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// Get Images From Gallery
router.get("/getImages", (req, res) => {
  const { petId } = req.body;
  try {
    gallery.find(petId, (err, data) => {
      if (err) {
        throw Error("Error Occured\n", err.message);
      } else {
        res.send({
          status: "success",
          message: "Sent Successfully",
          data: data,
        });
      }
    });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});

// delete Image from Gallery
router.get("/deleteImage", (req, res) => {
  const { galleryId } = req.body;
  try {
    gallery
      .findByIdAndDelete(galleryId)
      .then(() => {
        res.send({ status: "success", message: "Deleted Successfully" });
      })
      .catch((err) => {
        throw Error("Error Occured\n", err.message);
      });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
});
// Exporting Routes
module.exports = router;
