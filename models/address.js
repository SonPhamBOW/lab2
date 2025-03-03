const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city:{
        type: String,
        required: [true, 'City is required']
    },
    state:{
        type: String,
        required: [true, 'State is required']
    },
    country:{
        type: String,
        required: [true, 'Country is required']
    },
})

module.exports = mongoose.model("Address", addressSchema)