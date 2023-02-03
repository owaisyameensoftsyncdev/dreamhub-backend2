const { findOne, findOneAndSelect } = require("../../../helpers");
const { find } = require("../../../helpers");
const event = require("../../../models/event/index");
const { ObjectID } = require("../../../types");

const eventList = async (req, res) => {
    try {
        const _id = req.params.id;

        //const banner_img = req.body

        const userid = await findOne("user", { _id });

        //   console.log(userid, "userid...");

        if (!userid) {
            return res.status(404).send({ status: 404, message: "No User Found" });
        }

        //Events banners
        //const profileBanner = await find("event",);

        const profileBanner = await event.find({}, { "_id": 0, "banner_img": 1 });

        // console.log(profileBanner, "profileBanner...");


        if (!profileBanner) {
            return res.status(404).send({ status: 404, message: "No Banners Found" });
        }


        // Upcoming event lists


        let pad = function (n) { return n < 10 ? '0' + n : n; };
        var d = new Date();

        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();

        var dateStr = pad(year) + "-" + pad(month) + "-" + pad(date);

        console.log(typeof (dateStr), "datestr....", dateStr);

        const eventList = await find("event");


        let todayEvent = eventList.filter(obj => new Date(obj.timeMin).toDateString() === new Date().toDateString())
        
        console.log(todayEvent);
        // console.log(eventList);

        let futureEvent = eventList.filter(obj => new Date(obj.timeMin).toDateString() > new Date().toDateString())

        console.log(futureEvent, "futureEvent...");

        if (!futureEvent) {
            return res.status(404).send({ status: 404, message: "No events Found" });
        }

        //Past events list

        //   const pastEventList = await find("event");

        let pastEvent = eventList.filter(obj => new Date(obj.timeMin).toDateString() < new Date().toDateString())
        // console.log(pastEvent);



        // console.log(pastEvent, "pastEvent...");

        if (!pastEvent) {
            return res.status(404).send({ status: 404, message: "No past events Found" });
        }


        return res.status(200).send({ status: 200, profileBanner, futureEvent, pastEvent,todayEvent });

    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = eventList;
