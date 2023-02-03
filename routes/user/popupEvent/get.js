const { findOne, find, getAggregate, findOneAndSelect } = require("../../../helpers");
const user = require("../../../models/user/index");
const event = require("../../../models/event/index")
const { ObjectID } = require("../../../types");

const popEvent = async (req, res) => {
    try {
        const _id = req.params.id;

        const user = await findOne("user", { _id });

        if (!user) {
            return res.status(404).send({ status: 404, message: "No User Found" });
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


        let futureEvent = eventList.filter(obj => new Date(obj.timeMin).toDateString() === new Date().toDateString())

      
        // console.log(eventList);

        console.log(futureEvent, "futureEvent...");

        if (!futureEvent) {
            return res.status(404).send({ status: 404, message: "No events Found" });
        }

//        const dateList = event.aggregate([
//         {
//             $match:{status:'active'},
//         $project: {startDate:1, endDate:1}},
//        }
//     ])
        

// console.log(dateList,"datelist...");
// const eventTime = await getAggregate("event",
// [{
//     $project:
//     {
//     //   year: { $year: "$timeMin" },
//     //   month: { $month: "$timeMin" },
//     //   day: { $dayOfMonth: "$timeMin" },
//      _id: 0,
//       hour: { $hour: "$timeMin" },
//     //   minutes: { $minute: "$timeMin" },
//     //   seconds: { $second: "$timeMin" },
//     //   milliseconds: { $millisecond: "$timeMin" },
//     //   dayOfYear: { $dayOfYear: "$timeMin" },
//     //   dayOfWeek: { $dayOfWeek: "$timeMin" }
//     }
// }])
        

// const eventTime = await getAggregate("event",
// [{
//     $project:
//     {
//     //   year: { $year: "$timeMin" },
//     //   month: { $month: "$timeMin" },
//     //   day: { $dayOfMonth: "$timeMin" },
     
//       hour: { $hour: "$startDate" },
//        hour1: { $hour: "$endDate" }
//     //   minutes: { $minute: "$timeMin" },
//     //   seconds: { $second: "$timeMin" },
//     //   milliseconds: { $millisecond: "$timeMin" },
//     //   dayOfYear: { $dayOfYear: "$timeMin" },
//     //   dayOfWeek: { $dayOfWeek: "$timeMin" }
//     }
// }])


//console.log(eventTime);



// const endTime = await getAggregate("event",
// [{
//     $project:
//     {
//     //   year: { $year: "$timeMin" },
//     //   month: { $month: "$timeMin" },
//     //   day: { $dayOfMonth: "$timeMin" },
//      _id: 0,
//       hour: { $hour: "$endDate" },
//     //   hour: { $hour: "$endDate" },
//     //   minutes: { $minute: "$timeMin" },
//     //   seconds: { $second: "$timeMin" },
//     //   milliseconds: { $millisecond: "$timeMin" },
//     //   dayOfYear: { $dayOfYear: "$timeMin" },
//     //   dayOfWeek: { $dayOfWeek: "$timeMin" }
//     }
// }])

// console.log(endTime);

        return res.status(200).send({ status: 200, futureEvent});

    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = popEvent;
