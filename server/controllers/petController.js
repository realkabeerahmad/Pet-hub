// Express JS used to create Routes
const express = require("express");

// Pet Model Created using MongoDB
const Pet = require("../models/pet");

// Pet Walk Time Model Created using MongoDB
const PetWalkTime = require("../models/petWalkTime");

// Pet Meal Time Model Created using MongoDB
const PetMealTime = require("../models/petMealTime");

// Using Router from Express JS to create exportable routes
const router = express.Router();
