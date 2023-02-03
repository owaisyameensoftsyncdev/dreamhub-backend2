const mongoose = require("mongoose");
const schemaType = require("../../types");


const tokenSchema = new mongoose.Schema({
    userId: {
        type: schemaType.ObjectID,
        required: true,
        ref: "user",
    },
    token: {
        type: schemaType.TypeString,
        required: true,
    },
    createdAt: {
        type: schemaType.TypeDate,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = tokenSchema;