const express = require("express");
const  upload  = require("../../../lib/multer");
const getProfile = require("./get");
const updateProfile = require("./update");
const createProfile = require("./create");


const router = express.Router();

router.put(
  "/update/:id",
  upload.single("image"),
  updateProfile
);
router.get("/get/:id", getProfile);
router.post("/create/:id", upload.single("image"), createProfile);

module.exports = router;
