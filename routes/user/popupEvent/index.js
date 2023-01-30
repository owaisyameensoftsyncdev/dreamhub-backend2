const express = require("express");
const popEvents = require("./get");


const router = express.Router();

router.get("/events/:id", popEvents);


module.exports = router;
