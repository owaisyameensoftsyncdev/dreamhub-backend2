const express = require("express");
const profile = require("./profile");
const eventList = require("./eventList");
const upComingEvents = require("./upcomingevents.js");
const popupEvent = require("./popupEvent");

const router = express.Router();


router.use("/profile", profile);
router.use("/eventlist", eventList);
router.use("/eventlist", upComingEvents);
router.use("/popevents", popupEvent);

module.exports = router;