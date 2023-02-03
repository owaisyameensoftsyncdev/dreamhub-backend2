const mongoose = require("mongoose");
const UserOTPVerificationSchema = require("./userOTPVerification");

const userOTPVerification = mongoose.model("userOTPVerification", UserOTPVerificationSchema);

module.exports = userOTPVerification ;