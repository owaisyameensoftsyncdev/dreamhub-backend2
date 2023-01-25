const express = require("express");
const  upload  = require("../../../lib/multer");
const createEvent = require("./create");


const router = express.Router();


router.post("/create", upload.single("image"), createEvent);

module.exports = router;
