const Joi = require("joi");
const {
  findOne,
  insertNewDocument,
} = require("../../../helpers");
const { SECRET } = require("../../../config/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../../../models/token/index");

const schema = Joi.object({
 // full_Name: Joi.string().required(),
 username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  type: Joi.string().required(),
});

const signupWithEmail = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { password, type, email } = req.body;
    const emailExist = await findOne(
      "user",
      { email },
     
    );
    if (emailExist) {
      return res
        .status(400)
        .send({ status: 400, message: "User already exists with this email" });
    }
    const user_type = await findOne("userType", { type });
    if (!user_type) {
      return res
        .status(404)
        .send({ status: 404, message: "No User Type Found" });
    }
    req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // const token = jwt.sign({ id: user._id }, SECRET, {
    //   expiresIn: "24h",
    // });
    // // req.userId = user._id;

    const user = await insertNewDocument("user", {
      ...req.body,
      type: user_type._id,
    //  token: token
    });
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "24h",
    });
    req.userId = user._id;

    return res.status(200).send({ status: 200, user, token });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = signupWithEmail;
