const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../../../config");
//const saveActivity = require("../../../middleware/activity/save-activity");
const {
  findOneAndSelect,
  findOne,
  insertNewDocument,
  updateDocument,
} = require("../../../helpers");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    await schema.validateAsync(req.body);
    const user = await findOneAndSelect(


      
      "user",
      { email },
      "-followers -following"
    );
    console.log(user,"helloooo....");
    // if (user) {
    //   if (!user?.password) {
    //     return res
    //       .status(404)
    //       .send({ status: 400, message: "No Password found" });
    //   }
    //   const passwordIsValid = bcrypt.compareSync(password, user?.password);
    //   if (!passwordIsValid) {
    //     const updateAttempt = await findOne("attempt", { user_id: user._id });
    //     if (!updateAttempt) {
    //       const insertAttempt = await insertNewDocument("attempt", {
    //         user_id: user._id,
    //         no_of_attempt: 1,
    //       });
    //       return res
    //         .status(400)
    //         .send({ status: 400, message: "Invalid Email or Password!" });
    //     }
    //     // if (updateAttempt) {
    //     console.log(updateAttempt?.block_duration);
    //     const blockTime = new Date(updateAttempt?.block_duration).getTime();
    //     console.log(blockTime);
    //     const now = new Date().getTime();
    //     const diff = blockTime > now ? true : false;
    //     console.log(now);
    //     console.log(diff);
    //     const diffMs = blockTime - now;
    //     if (updateAttempt.block && updateAttempt.no_of_attempt === 6 && diff) {
    //       console.log(diff);
    //       return res.status(404).send({
    //         status: 400,
    //         // message: "Your account is blocked for 5 minutes",
    //         message: `You are blocked for ${Math.round(
    //           (diffMs % 86400000) / 60000
    //         )} minutes`,
    //       });
    //     }
    //     if (updateAttempt.block && updateAttempt.no_of_attempt >= 11 && diff) {
    //       const hrs =
    //         Math.round((diffMs % 86400000) / 3600000 - 1) <= 0
    //           ? ""
    //           : `${Math.round((diffMs % 86400000) / 3600000 - 1)} hr & `;
    //       const minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    //       return res.status(404).send({
    //         status: 400,
    //         message: `You are blocked for ${hrs}${minutes} minutes`,
    //       });
    //     }
    //     // }

    //     if (updateAttempt.no_of_attempt === 5) {
    //       const blockUser = await updateDocument(
    //         "attempt",
    //         {
    //           user_id: user._id,
    //         },
    //         {
    //           block: true,
    //           block_duration: Date.now() + 60000 * 30, // for 30 minutes
    //           no_of_attempt: updateAttempt.no_of_attempt + 1,
    //         }
    //       );
    //       return res.status(400).send({
    //         status: 400,
    //         message: "Now You are blocked for 30 minutes",
    //       });
    //     }
    //     if (updateAttempt.no_of_attempt >= 10) {
    //       const blockUser = await updateDocument(
    //         "attempt",
    //         {
    //           user_id: user._id,
    //         },
    //         {
    //           block: true,
    //           block_duration: Date.now() + 60000 * 60 * 24, // for 24 hours
    //           no_of_attempt: updateAttempt.no_of_attempt + 1,
    //         }
    //       );
    //       return res
    //         .status(400)
    //         .send({ status: 400, message: "Now You are blocked for 24 hours" });
    //     }
    //     const increaseAttempt = await updateDocument(
    //       "attempt",
    //       {
    //         user_id: user._id,
    //       },
    //       {
    //         no_of_attempt: updateAttempt.no_of_attempt + 1,
    //       }
    //     );
    //     return res
    //       .status(400)
    //       .send({ status: 400, message: "Invalid Email or Password!" });
    //   }
    //   const updateAttempt = await findOne("attempt", { user_id: user._id });
    //   if (updateAttempt) {
    //     const blockTime = new Date(updateAttempt?.block_duration).getTime();
    //     const now = new Date().getTime();
    //     const diff = blockTime > now ? true : false;
    //     const diffMs = blockTime - now;
    //     if (updateAttempt.block && updateAttempt.no_of_attempt === 6 && diff) {
    //       return res.status(404).send({
    //         status: 400,
    //         message: `You are blocked for ${Math.round(
    //           (diffMs % 86400000) / 60000
    //         )} minutes`,
    //       });
    //     }
    //     if (updateAttempt.block && updateAttempt.no_of_attempt >= 11 && diff) {
    //       const hrs =
    //         Math.round((diffMs % 86400000) / 3600000 - 1) <= 0
    //           ? ""
    //           : `${Math.round((diffMs % 86400000) / 3600000 - 1)} hr & `;
    //       const minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    //       return res.status(404).send({
    //         status: 400,
    //         message: `You are blocked for ${hrs}${minutes} minutes`,
    //       });
    //     }
    //   }
    //   if (user.status === "Disabled") {
    //     return res
    //       .status(400)
    //       .send({ status: 400, message: "Your account is Disabled" });
    //   }
    //   user.password = undefined;
    //   const resetAttempt = await updateDocument(
    //     "attempt",
    //     {
    //       user_id: user._id,
    //     },
    //     {
    //       no_of_attempt: 0,
    //       block: false,
    //       // block_duration: null,
    //     }
    //   );
   
  //     var token = jwt.sign({ id: user._id }, SECRET, {
  //       expiresIn: "24h",
  //     });
  //     req.userId = user._id;
     
  //    // saveActivity(req, res, `User(${email}) login successfully`);
  //     sendOTPVerificationEmail(result, res);
  
      
  // return res.status(200).send({ status: 200, user, token, });


  //   } else {
  //     return res
  //       .status(404)
  //       .send({ status: 404, message: "User does not exist!" });
  //   }
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = loginUser;
