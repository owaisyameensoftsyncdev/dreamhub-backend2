const Joi = require("joi");
const { findOne, updateDocument } = require("../../../helpers");
const event = require("../../../models/event/index");
const cloudinary = require("cloudinary").v2;


/// NOTE: WE CHECK THE UPDATE ISSUE FOR DATE

const schema = Joi.object({

    organizerName: Joi.string(),
    personName: Joi.string(),
    eventName: Joi.string(),
    description: Joi.string(),
    loc: Joi.string(),
    startDate: Joi.date().raw().required(),
    endDate: Joi.date().raw().required(),
   // timeMin: Joi.date().raw().required(),
    banner_img: Joi.string(),
    banner_img_url: Joi.string(),
});

const updateEvent = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
        console.log(req.body);
        console.log(req.file);
       // const { email } = req.body;
        const _id = req.params.id;

        let event = await findOne("event", { _id });
        if (!event) {
            return res.status(400).send({ status: 400, message: "No event Found" });
        }
        // if (email) {
        //     let check_email = await findOne("profile", { email });
        //     if (check_email) {
        //         if (user.email !== email) {
        //             return res.status(400).send({
        //                 status: 400,
        //                 message: "User already exist with this email",
        //             });
        //         }
        //     }
        // }
        
console.log(event, "event....");

      const deleteId =  await cloudinary.uploader.destroy(event.banner_img_url, function (error, result) {
         console.log(result, error);        
      });
        // if (req?.files?.profile_img?.path) {
        //     const profileImage = await cloudinary.uploader.upload(
        //         req?.files?.profile_img?.path
        //     );
        //     req.body.profile_img = profileImage.url;
            
        // }
       
       console.log(deleteId, "delete...");

        const result = await cloudinary.uploader.upload(req.file.path);

        console.log(result, "result....");

        const data = {
            organizerName: req.body.organizerName || event.organizerName,
            personName: req.body.personName || event.personName,
            eventName: req.body.eventName || event.eventName,
            description: req.body.description || event.description,
            loc: req.body.loc || event.loc, 
            startDate: req.body.startDate || event.startDate,
            endDate: req.body.endDate || event.endDate,
          //  timeMin: req.body.timeMin || event.timeMin,
            banner_img: result.secure_url || event.banner_img,
            banner_img_url: result.public_id || event.banner_img_url,
        }
     
        userEvent = await updateDocument("event", { _id }, data );

        return res
            .status(200)
            .send({ status: 200, message: "Event Updated Successfully", userEvent });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = updateEvent;
