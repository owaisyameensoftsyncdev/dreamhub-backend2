const express = require("express");
const router = express.Router();


const events = require("./events");
const manageEvents = require("./manageEvents");

router.use("/event", events);
router.use("/manageevent", manageEvents);

module.exports = router;
