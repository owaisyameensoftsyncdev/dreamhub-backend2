
const Token = require("../../../models/token");
const send_email = require("../../../lib/node-mailer");
const crypto = require("crypto");
const { findOne } = require("../../../helpers");
const Joi = require("joi");
const  sendOTPVerificationEmail = require("../otpVerification/sendOTPVerificationEmail");


const schema = Joi.object({
    email: Joi.string().email().required()
  });


const sendResetLink = async (req, res) => {
    try {
        await schema.validateAsync(req.body);

        //const user = await User.findOne({ email: req.body.email });
        const user = await findOne("user", {email: req.body.email})
        
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        // let token = await Token.findOne({ userId: user._id });

        // if (!token) {
        //     token = await new Token({
        //         userId: user._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();
        // }

        // const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        // await send_email(user.email, "Password reset", link);

         
    //   await  send_email(
    //         "resetPassword",
    //         {
    //             link: link,
    //         },
    //         "info@dreamhub.art",
    //         "Password reset",
    //         email
    //       );



    await sendOTPVerificationEmail(req, res)




         return res.status(200).json({ status: 200, msg:"check your email id"});


    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
        
    }
};

module.exports = sendResetLink