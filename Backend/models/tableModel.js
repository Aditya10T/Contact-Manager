const mongoose = require("mongoose");
const validator = require("validator");

const tableSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxLength: 80,
        minLength: 3
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:[true,"Please provide an email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    hobbies:{
        type:Array,
    }
})

module.exports = mongoose.model("Table", tableSchema);