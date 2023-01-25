const express = require("express");
const router = express.Router();


const events = require("./events");

router.use("/event", events);

module.exports = router;
