// bcrypt-nodejs used for Password Encription and Decription
const bcrypt = require("bcrypt-nodejs");

// to Read Enviorment Variables
const dotenv = require("dotenv");

// Express JS used to create Routes
const express = require("express");

// User Model Created using MongoDB
const User = require("../models/user");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// User OTP verification model
const userOtpVerification = require("../models/userOtpVerification");

// Setting Up Envionment Variables
dotenv.config();

// Import Transpoter
const transporter = require("../config/transporter");

// Import Multer Storage
const Upload = require("../config/multer");
const cart = require("../models/cart");

// Register route for Creating a new user
router.post("/register", (req, res) => {
  // Getting all required data from request body
  var { firstName, lastName, email, password } = req.body;
  // Generating Salt using genSaltSync function with 10 rounds
  const salt = bcrypt.genSaltSync(10);
  // Check if email already exist in DB
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(400).json({ status: "failed", message: "User Already Exist" });
    } else if (err) {
      res.status(500).json({ status: "failed", message: "Server Error" });
    } else {
      // Creating a user object to save in database
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        Image: "newUser.png",
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
          .then(async (result) => {
            SendOtpVerificationEmail(result, res);
          })
          .catch(() => {
            res
              .status(400)
              .json({ status: "failed", message: "Unable to Registered" });
          });
      });
    }
  });
});

// Show User route
router.get("/showUser", (req, res) => {
  const { userId } = req.body;
  User.findById({ userId }, (user, err) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).json({ status: "failed", error: err.message });
    }
  });
});

// Login route to allow registered users to login
router.post("/login", (req, res) => {
  // Getting all required data from request body
  const { email, password } = req.body;
  // Checking if User exist
  try {
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        if (user.verified) {
          // Decrypting and comparing Password
          const validPassword = bcrypt.compareSync(password, user.password);
          if (validPassword) {
            res
              .status(200)
              .json({ status: "success", message: "Valid Password" });
          } else {
            res.status(200).json({ message: "Invalid Password" });
          }
        } else {
          res
            .status(200)
            .json({ status: "failed", message: "Please Verify Your Email" });
        }
      } else {
        res.status(200).json({ message: "User do not Exist" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP route
router.post("/verifyOTP", async (req, res) => {
  try {
    // Get data from Request body
    let { userID, otp } = req.body;
    // Check OTP Details
    if (!userID || !otp) {
      throw Error("Empty otp Details are not allowed");
    } else {
      // Find OTP
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
        // Check if Expired
        if (expiredAt < Date.now()) {
          await userOtpVerification.deleteMany({ userID });
          throw new Error("Code has Expired. Please request again.");
        } else {
          // Check OTP
          const validotp = bcrypt.compareSync(otp, hashedOTP);
          if (!validotp) {
            throw new Error("Invalid OTP please check your Email.");
          } else {
            console.log("\nEor\n");
            // Update User Status
            await User.updateOne({ userID }, { verified: true });
            await userOtpVerification.deleteMany({ userID });
            res.json({
              status: "verified",
              message: "User Email Verified successfully.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
});

// Add User Image
router.post("/updateProfileImage", Upload.single("image"), (req, res) => {
  const { userId, Image } = req.body;
  try {
    User.updateOne({ _id: userId }, { Image: Image })
      .then(() => {
        res
          .status(200)
          .json({ status: "success", message: "Image Added successfully" });
      })
      .catch((err) => {
        res.status(400).json({
          status: "failed",
          message: "Unable to update Image",
          error: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

// Re-send OTP route
router.post("/reSendOtpVerificatioCode", async (req, res) => {
  try {
    // Get Data from Request Body
    let { userID, email } = req.body;
    //Check if Data is Correct
    if (!userID || !email) {
      throw Error("Empty user Details are not allowed");
    } else {
      // Delete old OTP Generated
      await userOtpVerification.deleteMany({ userID });
      // Call Send OTP Function
      SendOtpVerificationEmail({ userID, email }, res);
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
});

// Send OTP Function
const SendOtpVerificationEmail = async ({ _id, email }, res) => {
  try {
    // Generated OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    // Mail Options
    const mailOptions = {
      from: "otp.pethub@zohomail.com",
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
          status: "failed",
          error: "Not able to send OTP",
        });
      }
      return res.status(200).json({
        status: "pending",
        message: "Verification OTP email sent.",
        data: {
          userId: _id,
          email,
        },
      });
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
};

// Expoting Routes
module.exports = router;
