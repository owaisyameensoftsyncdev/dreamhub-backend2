const mongoose = require("mongoose");
const eventSchema = require("./events-schema");

const event = mongoose.model("event", eventSchema);

module.exports = event;