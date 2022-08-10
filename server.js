//Expoting All Required Modules
const express = require("express");
const connection = require("./server/config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const userRoutes = require("./server/controllers/userController");

//Setting Up Envionment Variables
dotenv.config();

//Creating Express App to Use Routes in Server
const app = express();
//MongoDB connection Using Mongoose
(async () => await connection())();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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

app.use(express.static(path.join(__dirname + "/Assets")));

app.use("/auth", userRoutes);
// app.get("/petAdoption", (req, res) => {
//   PetAdoptionModel.find((err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.json(data);
//     }
//   });
// });
// app.post("/AddProduct", upload.single("Image"), (req, res) => {
//   var obj = {
//     ItemName: req.body.name,
//     ItemQuantity: req.body.quantity,
//     ItemTag: req.body.tags,
//     ItemDetail: req.body.details,
//     ItemPrice: req.body.price,
//     Image: req.file.filename,
//     Link: req.body.name + "_" + req.body.tags + "_" + uuidv4(),
//   };
//   const product = new ShopModel(obj);
//   product
//     .save()
//     .then(() => res.send({ message: "Product Added" }))
//     .catch((err) => res.send({ messgae: "Problem Adding Product" + err }));
// });
// app.get("/ShowProducts", (req, res) => {
//   ShopModel.find((err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`Server Connected`.toUpperCase());
});
