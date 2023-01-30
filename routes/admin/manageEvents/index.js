const express = require("express");
const  upload  = require("../../../lib/multer");
const manageEvent = require("./create");
const updateEvent = require("./update");

const router = express.Router();


router.post("/create", upload.single("image"), manageEvent);
router.put("/update/:id", upload.single("image"), updateEvent);

module.exports = router;
