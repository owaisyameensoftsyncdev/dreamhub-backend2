const express = require("express");

const userType = require("./user-type");
const auth = require("./auth");
const user = require("./user");

const token = require("./check-token");

const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/user-type", userType);
router.use("/auth", auth);
router.use("/user", user);
router.use("/token", token);


module.exports = router;
