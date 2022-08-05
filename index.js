//Expoting All Required Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

//Setting Up Envionment Variables
dotenv.config();

//Creating Express App to Use Routes in Server
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//MongoDB connection Using Mongoose
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connection to DATABASE successfull`.toUpperCase()))
  .catch((err) => console.log(err));

//Setting Muter Storage for saving Images on Server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Assets");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

//Creating PetModel
const PetSchema = new mongoose.Schema({
  userEmail: String,
  petName: String,
  petType: String,
  petBreed: String,
  petGender: String,
  petDob: Date,
  vetAddress: String,
  PetDescription: String,
});
const PetModel = new mongoose.model("Pet", PetSchema);

//Creating Shop Model
const ShopSchema = new mongoose.Schema({
  ItemName: String,
  ItemQuantity: Number,
  ItemTag: String,
  ItemDetail: String,
  ItemPrice: Number,
  Image: String,
  Link: String,
});
const ShopModel = new mongoose.model("Shop", ShopSchema);
app.use(express.static(path.join(__dirname + "/uploads")));
//Creating Routes
//User Routes
app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  User.findOne({ Email: Email }, (err, user) => {
    if (user) {
      if (Password === user.Password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't Match" });
      }
    } else {
      res.send({ message: "User not Registered" });
    }
  });
});
app.post("/register", (req, res) => {
  const { FirstName, Email, Password } = req.body;
  User.findOne({ Email: Email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      const user = new User({
        FirstName,
        LastName: "",
        Image: "",
        Email,
        Password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
});

//PetAdoption Routes
app.get("/petAdoption", (req, res) => {
  PetAdoptionModel.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});
app.post("/AddProduct", upload.single("Image"), (req, res) => {
  var obj = {
    ItemName: req.body.name,
    ItemQuantity: req.body.quantity,
    ItemTag: req.body.tags,
    ItemDetail: req.body.details,
    ItemPrice: req.body.price,
    Image: req.file.filename,
    Link: req.body.name + "_" + req.body.tags + "_" + uuidv4(),
  };
  const product = new ShopModel(obj);
  product
    .save()
    .then(() => res.send({ message: "Product Added" }))
    .catch((err) => res.send({ messgae: "Problem Adding Product" + err }));
});
app.get("/ShowProducts", (req, res) => {
  ShopModel.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected`.toUpperCase());
});
