const Joi = require("joi");
const { findOne, insertNewDocument } = require("../../../helpers");
const Profile = require("../../../models/Profile/index");
const cloudinary = require("cloudinary").v2;

const schema = Joi.object({

    username: Joi.string(),
    email: Joi.string(),
    wallet: Joi.string(),
    city: Joi.string(),
    gender: Joi.string(),
    address: Joi.string(),
    profile_img: Joi.string(),
    profile_img_url: Joi.string(),
});




const createProfile = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
        console.log(req.body);
        console.log(req.file);
        const { email } = req.body;
        const _id = req.params.id;
        let user = await findOne("user", { _id });
        if (!user) {
            return res.status(400).send({ status: 400, message: "No User Found" });
        }
        if (email) {
            let check_email = await findOne("user", { email });
            if (check_email) {
                if (user.email !== email) {
                    return res.status(400).send({
                        status: 400,
                        message: "User already exist with this email",
                    });
                }
            }
        }

        const result = await cloudinary.uploader.upload(
            req?.file?.path
        );

        // Create instance of Profile user
        let profile = new Profile({
            username: req.body.name,
            email: req.body.email,
            wallet: req.body.wallet,
            city: req.body.city,
            gender: req.body.gender,
            address: req.body.address,
            profile_img: result.secure_url,
            profile_img_url: result.public_id,
        });

        const profileCreate = await insertNewDocument("profile", { profile })

        return res
            .status(200)
            .send({ status: 200, message: "User Profile created Successfully", profileCreate });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = createProfile;
