const Joi = require("joi");
const {
  findOne,
  insertNewDocument,
  updateDocument,
} = require("../../../helpers");
const { SECRET } = require("../../../config");
const jwt = require("jsonwebtoken");
const { tokenVerification } = require("../../../middleware");


const schema = Joi.object({
  preferred_method: Joi.string().required().valid("Email", "MetaMask"),
  username: Joi.string().when("preferred_method", {
    is: "MetaMask",
    then: Joi.required(),
  }),
  type: Joi.string().when("preferred_method", {
    is: "MetaMask",
    then: Joi.required(),
  }),
  metaAddress: Joi.string().when("preferred_method", {
    is: "Email",
    then: Joi.required(),
  }),
  userId: Joi.string().when("preferred_method", {
    is: "Email",
    then: Joi.required(),
  }),
});

const signup = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    const { username, type, preferred_method, metaAddress, userId } = req.body;
    if (preferred_method === "MetaMask") {
      const address = await req.web3.utils.isAddress(username);
      if (!address) {
        return res.status(400).send({
          status: 400,
          message: "Your provided username is not valid",
        });
      }
      let user = await findOne(
        "user",
        { username: new RegExp("^" + username + "$", "i") },
      );
      if (user) {
        const resetAttempt = await updateDocument(
          "attempt",
          {
            user_id: user._id,
          },
          {
            no_of_attempt: 0,
            block: false,
            // block_duration: null,
          }
        );
        const token = jwt.sign({ id: user._id }, SECRET, {
          expiresIn: "24h",
        });
        req.userId = user._id;
     
        return res.status(200).send({ status: 200, user, token });
      }
      const user_type = await findOne("userType", { type });
      if (!user_type) {
        return res
          .status(404)
          .send({ status: 404, message: "No User Type Found" });
      }
      user = await insertNewDocument("user", {
        username,
        type: user_type._id,
      });
      const token = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: "24h",
      });
      const resetAttempt = await updateDocument(
        "attempt",
        {
          user_id: user._id,
        },
        {
          no_of_attempt: 0,
          block: false,
          // block_duration: null,
        }
      );
      req.userId = user._id;
      
      return res.status(200).send({ status: 200, user, token });
    }
    if (preferred_method === "Email") {
       tokenVerification(req, res, next);
      const address = await req.web3.utils.isAddress(metaAddress);
      if (!address) {
        return res.status(400).send({
          status: 400,
          message: "Your provided username is not valid",
        });
      }
      let user = await findOne(
        "user",
        { username: new RegExp("^" + metaAddress + "$", "i") },
        
      );
      if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, {
          expiresIn: "24h",
        });
        const resetAttempt = await updateDocument(
          "attempt",
          {
            user_id: user._id,
          },
          {
            no_of_attempt: 0,
            block: false,
            // block_duration: null,
          }
        );
        req.userId = user._id;

        
        return res.status(200).send({ status: 200, user, token });
      }
      const check_user = await findOne("user", { _id: userId });
      if (!check_user) {
        return res.status(404).send({
          status: 404,
          message: "No user found",
        });
      }
      user = await updateDocument(
        "user",
        {
          _id: userId,
        },
        {
          username: metaAddress,
        }
      );
     
      const token = jwt.sign({ id: user._id }, SECRET, {
        expiresIn: "24h",
      });
      const resetAttempt = await updateDocument(
        "attempt",
        {
          user_id: user._id,
        },
        {
          no_of_attempt: 0,
          block: false,
          // block_duration: null,
        }
      );
   
      return res.status(200).send({ status: 200, user, token });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = signup;
