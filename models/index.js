const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.userType = require("./user-type");
//db.follow = require("./follow");
//db.nft = require("./nft");
//db.blog = require("./blog");
//db.bid = require("./bid");
//db.history = require("./history");
//db.auction = require("./auction");
//db.attempt = require("./attempts");
//db.nftMetaData = require("./nft-metadata");
//db.activity = require("./activity");
//db.subscribe = require("./subscribe");
//db.pandoras = require("./pandoras");
db.UserOTPVerification = require("./otpVerification");
//db.allowlist = require('./allowlist')
//db.pandorasAllowlist=require('./pandorasAllowlist')


module.exports = db;
