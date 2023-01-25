const express = require("express");
const profile = require("./profile");


const router = express.Router();


router.use("/profile", profile);


module.exports = router;