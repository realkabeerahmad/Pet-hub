//Expoting All Required Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Importing Authentication Routes
const userRoutes = require("./server/controllers/userController");

// Impoting Pet Routes
const petRoutes = require("./server/controllers/petController");

// Impoting Pet Routes
const shopRoutes = require("./server/controllers/shopController");

// Impoting Pet Routes
const petAdoptionRoutes = require("./server/controllers/petAdoptionController");

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

app.use("/pet", petRoutes);

app.use("/shop", shopRoutes);

app.use("/adoption", petAdoptionRoutes);

// Starting Server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server Connected`.toUpperCase());
});
