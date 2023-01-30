const mongoose = require("mongoose");
const SchemaType = require("../../types");

const eventSchema = new mongoose.Schema(
    {
        organizerName: {
            type: SchemaType.TypeString,
            // required: [true, "Please provide the organizer name"]

        },
        personName: {
            type: SchemaType.TypeString,
            //required: [true,"Please provide the person name"]

        },
        banner_img: {
            type: SchemaType.TypeString,
            //required: [true,"Please provide the banner image"]

        },

        banner_img_url: {
            type: SchemaType.TypeString,
        },

        eventName: {
            type: SchemaType.TypeString,
            //required: [true,"Please provide the event name"]
        },

        description: {
            type: SchemaType.TypeString,
            //required: [true,"Please provide the description"]
        },

        loc: {
            type: SchemaType.TypeString,
            coordinates: [],
            // required: [true,"Please provide the location"]
        },

        // location: {
        //     type: 
        //         SchemaType.TypeString,
        //         coordinates: []
        //    },
        ticket: {
            type: SchemaType.TypeNumber,
            default: 0,
        },

        status: {
            type: SchemaType.TypeString,
            enum: ["Sold", "Unsold"],
            default: "Unsold",
        },

        startDate: {
            type: SchemaType.TypeDate,
            default: new Date().toISOString(),
        },

        endDate: {
            type: SchemaType.TypeDate,
            default: new Date().toISOString(),
        },

        timeMin: {
            type: SchemaType.TypeDate,
            default: new Date().toISOString(),
        },

        // timeEnd: {
        //     type: SchemaType.TypeDate,
        //     default: new Date().toISOString(),
        // },



        timeinsec: {

            type: SchemaType.TypeNumber,
            default: (new Date()).getTime()
        },

        // time: {
        //     type: SchemaType.TypeNumber,
        //     default: (new Date()).getTime()
        // },
    },
    { timestamps: true }
);


eventSchema.index({ location: "2dsphere" });

module.exports = eventSchema;



















