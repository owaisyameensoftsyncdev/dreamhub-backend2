const mongoose = require("mongoose");
const profileSchema = require("./profile-schema");

const user = mongoose.model("Profile", profileSchema);

module.exports = user;
