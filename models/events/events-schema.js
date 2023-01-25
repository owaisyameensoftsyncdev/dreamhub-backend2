const mongoose = require("mongoose");
const SchemaType = require("../../types");

const eventSchema = new mongoose.Schema(
    {
        organizerName: {
            type: schemaType.TypeString,
            required: [true, "Please provide the organizer name"]

        },
        personName: {
            type: schemaType.TypeString,
            required: [true,"Please provide the person name"]

        },
        banner: {
            type: schemaType.TypeString,
            required: [true,"Please provide the banner image"]

        },
        eventName: {
            type: schemaType.TypeString,
            required: [true,"Please provide the event name"]
        },

        description: {
            type: schemaType.TypeString,
            required: [true,"Please provide the description"]
        },

        loc: {
             type: "Point", 
             coordinates: [ longitude, latitude ] ,
             required: [true,"Please provide the location"]
            },

        // location: {
        //     type: 
        //         schemaType.TypeString,
        //         coordinates: []
        //    },

        startDate: {
            type: schemaType.TypeDate,
            default: Date,
        },
        endDate: {
            type: schemaType.TypeDate,
            default: Date,
        },
        time: {
            type: schemaType.TypeNumber,
            default: (new Date()).getTime()
        },
    },
    { timestamps: true }
);


eventSchema.index({ location: "2dsphere" });

module.exports = eventSchema;



















