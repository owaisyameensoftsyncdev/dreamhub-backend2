const mongoose = require("mongoose");
const eventSchema = require("./profile-schema");

const event = mongoose.model("event", eventSchema);

module.exports = event;