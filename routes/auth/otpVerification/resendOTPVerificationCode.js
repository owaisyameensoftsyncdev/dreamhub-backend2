const sendOTPVerificationEmail = require("./sendOTPVerificationEmail.js");
const { deleteManyDocument } = require("../../../helpers/index");

const resendOTPVerificationCode = async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      throw new Error("Empty user details are not allowed");
    } else {
      const deleteOtp = await deleteManyDocument("UserOTPVerification", {
        userId,
      });
      
      sendOTPVerificationEmail({ _id: userId, email }, res);


      return res
        .status(200)
        .json({ status: 200, message: sendOTPVerificationEmail });
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = resendOTPVerificationCode;
