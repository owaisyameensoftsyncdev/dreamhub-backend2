const { findOne, find, getAggregate } = require("../../../helpers");
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


        let futureEvent = eventList.filter(obj => new Date(obj.timeMin).toDateString() > new Date().toDateString())

      
        // console.log(eventList);

        console.log(futureEvent, "futureEvent...");

        if (!futureEvent) {
            return res.status(404).send({ status: 404, message: "No events Found" });
        }



const eventTime = await getAggregate("event",
[{
    $project:
    {
    //   year: { $year: "$timeMin" },
    //   month: { $month: "$timeMin" },
    //   day: { $dayOfMonth: "$timeMin" },
     _id: 0,
      hour: { $hour: "$timeMin" },
    //   minutes: { $minute: "$timeMin" },
    //   seconds: { $second: "$timeMin" },
    //   milliseconds: { $millisecond: "$timeMin" },
    //   dayOfYear: { $dayOfYear: "$timeMin" },
    //   dayOfWeek: { $dayOfWeek: "$timeMin" }
    }
}])
        

console.log(eventTime);

        return res.status(200).send({ status: 200, futureEvent, eventTime });

    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = popEvent;
