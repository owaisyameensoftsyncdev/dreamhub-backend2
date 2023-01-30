const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.profile = require("./Profile");
db.userType = require("./user-type");
db.UserOTPVerification = require("./otpVerification");
db.attempt = require('./attempt')
db.event = require('./event')


module.exports = db;
