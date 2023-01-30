const mongoose = require("mongoose");
const SchemaType = require("../../types");

const profileSchema = new mongoose.Schema(
    {
        username: {
            type: SchemaType.TypeString,

        },
        email: {
            type: SchemaType.TypeString,
          
        },
        wallet: {
            type: SchemaType.TypeString,
        },
        city: {
            type: SchemaType.TypeString,
        },

        gender: {
            type: SchemaType.TypeString,
            enum: ["Male", "Female", "Other"]
        },
        address: {
            type: SchemaType.TypeString,
        },
        profile_img: {
            type: SchemaType.TypeString,
        },   
        profile_img_url: {
            type: SchemaType.TypeString,
        },      
    },
    { timestamps: true }
);

module.exports = profileSchema;
