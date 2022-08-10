const bcrypt = require("bcrypt-nodejs");
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", (req, res, next) => {
  var { firstName, lastName, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(400).send({ message: "User Already Exist" });
    } else if (err) {
      console.log(err);
    } else {
      const user = new User({
        firstName,
        lastName,
        email,
        password,
      });
      bcrypt.hash(user.password, salt, null, async (err, hash) => {
        if (err) {
          console.log(err);
        }
        user.password = hash;
        await user
          .save()
          .then(() => {
            res.status(200).send({ message: "Successfully Registered" });
          })
          .catch(() => {
            res.status(400).send({ message: "Unable to Registered" });
          });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });
});

module.exports = router;
