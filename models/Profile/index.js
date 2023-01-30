const mongoose = require("mongoose");
const profileSchema = require("./profile-schema");

const profile = mongoose.model("profile", profileSchema);

module.exports = profile;
