const mongoose = require("mongoose");
const tokenSchema = require("./token");

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
