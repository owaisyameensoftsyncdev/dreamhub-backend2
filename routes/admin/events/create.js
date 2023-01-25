const { findOne, insertNewDocument } = require("../../../helpers");
const event = require("../../../models/events/index");
const cloudinary = require("cloudinary").v2;





const createEvent = async (req, res) => {
    try {

        let event = await findOne("event", { _id });
        if (!event) {
            return res.status(400).send({ status: 400, message: "No event Found" });
        }


        const result = await cloudinary.uploader.upload(
            req?.file?.path
        );

        // Create instance of Events user
        let events = new event({
            organizerName: req.body.organizerName,
            personName: req.body.personName,
            eventName: req.body.eventName,
            description: req.body.description,
            loc:req.body.loc,
            banner: result.secure_url,
            profile_img_url: result.public_id,
        });

        const eventCreate = await insertNewDocument("event", { events })

        return res
            .status(200)
            .send({ status: 200, message: "Event created Successfully", eventCreate });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = createEvent;


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



