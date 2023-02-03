const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: schemaType.TypeString,
     
    },
    // first_Name: {
    //   type: schemaType.TypeString,
    // },

    // last_Name: {
    //   type: schemaType.TypeString,
    // },

    // full_Name: {
    //   type: schemaType.TypeString,
    // },

    email: {
      type: schemaType.TypeString,
      // unique: true
    },
  
    profile_img: {
      type: schemaType.TypeString,
    },
    
    // url: {
    //   type: schemaType.TypeString,
    //},
    password: {
      type: schemaType.TypeString,
    },
    status: {
      type: schemaType.TypeString,
      default: "Active",
    },
    type: {
      type: schemaType.ObjectID,
      ref: "user-types",
    },
   
    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    status: {
      type: schemaType.TypeString,
      enum: ["Active", "Disabled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
