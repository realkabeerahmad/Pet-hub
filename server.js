//Expoting All Required Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./server/controllers/userController");

//Setting Up Envionment Variables
dotenv.config();

//Creating Express App to Use Routes in Server
const app = express();

//MongoDB connection Using Mongoose
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to DB successfull`.toUpperCase()))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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
