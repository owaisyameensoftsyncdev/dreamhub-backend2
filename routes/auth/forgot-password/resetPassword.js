 const  users = require("../../../models/user/index");

 const bcrypt = require("bcryptjs");

// const crypto = require("crypto");

//const { findOne, findOneAndSelect } = require("../../../helpers");
const Joi = require("joi");


const schema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

const passwordReset = async (req, res) => {
    try {
        await schema.validateAsync(req.body);


        
        //const userId = req.params

                const user = await users.findById(req.params.userId);
    //    const user = await findOne("user", {userId});

        // if (!user) {
        //     return res.status(400).json("invalid link or expired");
        // }

        // const token = await Token.findOne({
        //     userId: user._id,
        //     token: req.params.token,
        // });
        // const token = await findOne("Token", {
        //     userId: user._id,
        //     token: req.params.token,
        // });
        // if (!token) {
        //     return res.status(400).json("Invalid link or expired");
        // }

        
        user.password = req.body.password;
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        await user.save();
      //  await token.delete();

        res.send("password reset sucessfully.");
    } catch (e) {
        return  res.status(400).json({ status: 400, message: e.message });
       
    }
};

module.exports = passwordReset;