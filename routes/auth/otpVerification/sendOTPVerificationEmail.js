const { UserOTPVerification } = require("../../../models/otpVerification/index");
const bcrypt = require("bcryptjs");
const { send_email } = require("../../../lib/node-mailer/index");
const { insertNewDocument } = require("../../../helpers/index");


// send otp verification email
const sendOTPVerificationEmail = async (req, res) => {
  try {
    const { _id, email } = req.body;
    console.log(email, "email");


    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;



    // hash the otp
    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);

    console.log(hashedOTP, "hashedotp...");

    const newOtpVerification = new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    // save otp record

    const insertNewDocument = await insertNewDocument("newOtpVerification", {
      ...req.body,
    });


    send_email(
      "otptemplate",
      {
        otp: otp,
      },
      "info@dreamhub.art",
      "Verify Your Email",
      email
    );


    res.status(200).json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: _id,
        email,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Enter current otp",
    });
  }
};

module.exports = sendOTPVerificationEmail;
