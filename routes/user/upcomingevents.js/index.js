const express = require("express");
const upComingEvents = require("./events");


const router = express.Router();


router.get("/upcomingevents/:id", upComingEvents);


module.exports = router;