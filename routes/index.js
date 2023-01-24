const express = require("express");
const { adminVerification } = require("../middleware");
const userType = require("./user-type");
const auth = require("./auth");
//const user = require("./user");
//const subscribe = require("./user/subscribe");
const token = require("./check-token");
//const admin = require("./admin");
// const metadata = require("./nft-metadata");
// const moralis = require("./moralis");
// const activity = require("./user/activity");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/user-type", userType);
router.use("/auth", auth);
//router.use("/user", user);
router.use("/token", token);
//router.use("/admin", adminVerification, admin);
// router.use("/nft-metadata", metadata);
// router.use("/moralis", moralis);
// router.use("/activity", activity);

module.exports = router;
