const { findOne, findOneAndSelect } = require("../../../helpers");
const { find } = require("../../../helpers");
const event = require("../../../models/event/index");
const { ObjectID } = require("../../../types");

const upComingEvents = async (req, res) => {
    try {

        const _id = req.params.id;

        const userid = await findOne("user", { _id });

     //   console.log(userid, "userid...");

        if (!userid) {
            return res.status(404).send({ status: 404, message: "No User Found" });
        }

        //Events banners
        //const profileBanner = await find("event");

      //  const profileBanner = await event.find({});
       
       // console.log(profileBanner, "profileBanner...");


        // if (!profileBanner) {
        //     return res.status(404).send({ status: 404, message: "No Banners Found" });
        // }


        // Upcoming event lists

        let pad = function (n) { return n < 10 ? '0' + n : n; };
        var d = new Date();

        var date = d.getDate();
        var month = d.getMonth() + 1; 
        var year = d.getFullYear();
         
        var dateStr = pad(year) + "-" + pad(month) + "-" + pad(date);
        // 2023-01-28
            // const online = await Online.find({ Date: dateStr })
            // res.status(200).json(online.length)

console.log(typeof(dateStr), "datestr....", dateStr);


            const eventList = await find("event",{});
     //   const eventList = await find("event", {"timestamp": {$gte: Date()}});

       // console.log(eventList, "eventList..dfdfdf.");
        //console.log(typeof(eventList), "eventList..dfdfdf.",eventList);
        
        // const convertObj = JSON.stringify(eventList);
        // console.log(typeof(convertObj));
      
        // let futureEvent = eventList.filter(obj=> new Date(obj.timeMin).toDateString() === new Date('2023-01-28').toDateString()) 
        // console.log(eventList);
      

        let futureEvent1 = eventList.filter(obj=> new Date(obj.timeMin).toDateString() > new Date().toDateString()) 
        console.log(futureEvent1);

        // let pastEvent = eventList.filter(obj=> new Date(obj.timeMin).toDateString() < new Date('2023-01-28').toDateString()) 
        // console.log(pastEvent);


        // let pastEvent1 = eventList.filter(obj=> new Date(obj.timeMin).toDateString() < new Date().toDateString()) 
        //  console.log(pastEvent1);


        // if (!eventList) {
        //     return res.status(404).send({ status: 404, message: "No events Found" });
        // }

//        return res.status(200).send({ status: 200, futureEvent, pastEvent});

        return res.status(200).send({ status: 200, futureEvent1});

    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = upComingEvents;




// Upcoming Event schedule(Time /Date)
// Events banner
// No of tickets sold so far
// Locations
// Organizers names
