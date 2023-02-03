const Joi = require("joi");
const {
  findOne,
  insertNewDocument,
  updateDocument,
} = require("../../../helpers");
const { SECRET } = require("../../../config/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  user = require("../../../models/user/index");
const { update } = require("../../../models/Profile");


const schema = Joi.object({
   old_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  new_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  confirm_password: Joi.string().required().valid(Joi.ref("new_password")),

});

const change_password = async(req, res) => {
    try {
        await schema.validateAsync(req.body);
   
         const {old_password, new_password} = req.body;
   
   const {userId} = req.params

   const user = await findOne("user", {_id: userId})
   console.log(user,"user...");
   
   
   
   


//  let current_user = req.users;

// console.log(current_user, "current_user...");

//const current_user = await users.findById(req.params.userId);
console.log(old_password,"old_password...");

if(bcrypt.compareSync(req.body.old_password,user.password)) {

let hashPassword = bcrypt.hashSync(req.body.new_password, 10);

console.log(hashPassword, "hashPassword...");

// await users.updateOne({
//     _id: current_user._id
// },{
//     password: hashPassword
// });


const userData = await updateDocument("user",{_id: user._id},{password: hashPassword})

// let userData = await users.findOne({_id: current_user._id})

 console.log(userData, "userData....");

var token = jwt.sign({ data: userData }, SECRET, {
    expiresIn: "24h",
  });
// //  req.userId = user._id;

console.log(token);


return res.json({status: 200, message: "Password Updated Successfully",userData: userData, token:token})


 } else {
    return res.json({status: 400, message: "Old Password does not matched", })
}


    } catch (error) {
        res.json({message: error.message, error:"erorr......."})
    }
}

module.exports = change_password;

