// bcrypt-nodejs used for Password Encription and Decription
const bcrypt = require("bcrypt-nodejs");

// Express JS used to create Routes
const express = require("express");

// User Model Created using MongoDB
const User = require("../models/user");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Using Nodemailer to send Emails
const nodemailer = require("nodemailer");

// User OTP verification model
const userOtpVerification = require("../models/userOtpVerification");

// Register route for Creating a new user
router.post("/register", (req, res) => {
  // Getting all required data from request body
  var { firstName, lastName, email, password, Image } = req.body;
  // Generating Salt using genSaltSync function with 10 rounds
  const salt = bcrypt.genSaltSync(10);
  // Check if email already exist in DB
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(400).send({ message: "User Already Exist" });
    } else if (err) {
      res.status(500).send({ message: "Server Error" });
    } else {
      // Creating a user object to save in database
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        Image,
      });
      // Hashing users password
      bcrypt.hash(user.password, salt, null, async (err, hash) => {
        if (err) {
          console.log(err);
        }
        // Storing HASH Password in user object
        user.password = hash;
        // Storing user in our Database
        await user
          .save()
          .then((result) => {
            SendOtpVerificationEmail(result, res);
            // res.status(200).send({ message: "Successfully Registered" });
          })
          .catch(() => {
            res.status(400).send({ message: "Unable to Registered" });
          });
      });
    }
  });
});

// Login route to allow registered users to login
router.post("/login", (req, res) => {
  // Getting all required data from request body
  const { email, password } = req.body;
  // Checking if User exist
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      // Decrypting and comparing Password
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

const SendOtpVerificationEmail = async ({ _id, email }, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "pethub@zohomail.com",
        pass: "NSurUy7hmjY0",
      },
    });
    // Generated OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    // Mail Options
    const mailOptions = {
      from: "pethub@zohomail.com",
      to: email,
      subject: "Verify your Email",
      text: "OTP Verification Email",
      html: `<p>Enter <b>${otp}</b> to verify your email address and complete the Registration</p>
      <p>This code Expires in <b>1 hour</b></p>`,
    };

    //hash the OTP
    const saltRounds = 10;

    // generating salt
    const salt = bcrypt.genSaltSync(saltRounds);

    // getting Hashed OTP
    const hashedOTP = bcrypt.hashSync(otp, salt);

    //OTP Verification DB object
    const newOtpVerfication = new userOtpVerification({
      userID: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });
    await newOtpVerfication.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "FAILED",
          error: "Not able to send OTP",
        });
      }
      return res.status(200).json({
        status: "PENDING",
        message: "Verification OTP email sent.",
        data: {
          userId: _id,
          email,
        },
      });
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};
router.post("/verifyOTP", async (req, res) => {
  try {
    let { userID, otp } = req.body;
    if (!userID || !otp) {
      throw Error("Empty otp Details are not allowed");
    } else {
      const userVerificationRecords = await userOtpVerification.find({
        userID,
      });
      if (userVerificationRecords.length <= 0) {
        throw new Error(
          "Account record doesn't exist or has been verified already. Please Signup or Login."
        );
      } else {
        const { expiredAt } = userVerificationRecords[0];
        const hashedOTP = userVerificationRecords[0].otp;
        if (expiredAt < Date.now()) {
          await userOtpVerification.deleteMany({ userID });
          throw new Error("Code has Expired. Please request again.");
        } else {
          const validotp = bcrypt.compareSync(otp, hashedOTP);
          if (!validotp) {
            throw new Error("Invalid OTP please check your Email.");
          } else {
            console.log("\nEor\n");
            await User.updateOne({ userID }, { verified: true });
            await userOtpVerification.deleteMany({ userID });
            res.json({
              status: "VERIFIED",
              message: "User Email Verified successfully.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});

router.post("/reSendOtpVerificatioCode", async (req, res) => {
  try {
    let { userID, email } = req.body;
    console.log(req.body);
    if (!userID || !email) {
      throw Error("Empty user Details are not allowed");
    } else {
      await userOtpVerification.deleteMany({ userID });
      SendOtpVerificationEmail({ userID, email }, res);
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
});
// Expoting Routes
module.exports = router;
