const Joi = require("joi");
const { findOne, insertNewDocument } = require("../../../helpers");
const event = require("../../../models/event");
const cloudinary = require("cloudinary").v2;



const schema = Joi.object({

    organizerName: Joi.string(),
    personName: Joi.string(),
    eventName: Joi.string(),
    description: Joi.string(),
    loc: Joi.string(),
    startDate: Joi.date().raw().required(),
    endDate: Joi.date().raw().required(),
    status:Joi.string(),
    banner_img: Joi.string(),
    banner_img_url: Joi.string(),
});

const manageEvent = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
        
//const { endDate } = req.body
        // let event = await findOne("event", { _id });
        // if (!event) {
        //     return res.status(400).send({ status: 400, message: "No event Found" });
        // }

//const newDate =  endDate + 1 

//console.log(newDate, "newDate");
        const result = await cloudinary.uploader.upload(
            req?.file?.path
        );

console.log(result, "resukt...");

        // Create instance of Events user
        let events = new event({
            organizerName: req.body.organizerName,
            personName: req.body.personName,
            eventName: req.body.eventName,
            description: req.body.description,
            loc: req.body.loc,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status,
            banner_img: result.secure_url,
            banner_img_url: result.public_id,
            //endDate:newDate
        });


        console.log(events, "events..");

        const eventCreate = await insertNewDocument("event", (events))


        console.log(eventCreate, "eventcreate");

        return res
            .status(200)
            .send({ status: 200, message: "Event created Successfully", eventCreate });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = manageEvent;


// location get /find near location

// const UserModel = require('../mongo/models/Users');

// exports.searchEmployee = async function (req, res) {

//     var latitude = req.query.latitude
//     var longitude = req.query.longitude    
    

//     try {

//         var users = await UserModel.find(
//             {
//                 location:
//                 {
//                     $near:
//                     {
//                         $geometry: { type: "Point", coordinates: [longitude, latitude] },
//                         $maxDistance: 500, // distance is in meters

//                     }
//                 },
                
//             }
//         );
//         return res.status(200).json({ msg: "success", users: users });
//     } catch (error) {

//          return res.status(500).json({ msg: "success", err: error });   
    
//     }



// ======================

// Message.find({
//     location: {
//      $near: {
//       $maxDistance: 1000,
//       $geometry: {
//        type: "Point",
//        coordinates: [long, latt]
//       }
//      }
//     }
//    }).find((error, results) => {
//     if (error) console.log(error);
//     console.log(JSON.stringify(results, 0, 2));
//    });



