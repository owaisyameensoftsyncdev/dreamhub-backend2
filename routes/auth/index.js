const express = require("express");
const adminLogin = require("./admin-auth/login");
const adminSignup = require("./admin-auth/signup");
const loginUser = require("./login");
const signup = require("./signup");
const resendOTPVerificationCode = require("./otpVerification/resendOTPVerificationCode");
const verifyOTP = require("./otpVerification/verifyOTP");
const sendOTPVerificationEmail = require("./otpVerification/sendOTPVerificationEmail");
const sendResetLink = require("./forgot-password/sendToken");
const passwordReset = require("./forgot-password/resetPassword");
const change_password = require("./changepassword");

const signupWithEmail = require("./signup/signup-with-email");

//const getdata = require("../auth/signup/get");

const router = express.Router();




//router.get("/register/email", getdata);


// User
router.post("/register", signup);
router.post("/verifyOTP", verifyOTP);
router.post("/sendOTPVerificationEmail", sendOTPVerificationEmail);
router.post("/resendOTPVerificationCode", resendOTPVerificationCode);
router.post("/register/email", signupWithEmail);
router.post("/login", loginUser);

//Forget Passowrd
router.post("/passwordReset", sendResetLink )
router.post("/passwordReset/:userId", passwordReset )

// Change passowrd
router.put("/:userId/changepassword", change_password )


//Admin
router.post("/admin/register", adminSignup);
router.post("/admin/login", adminLogin);

module.exports = router;
