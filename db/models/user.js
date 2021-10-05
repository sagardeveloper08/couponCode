const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    couponCode: {
        type: String,
        min: 5,
        max: 15,
        trim: true,
        // required: true,
    }
})

module.exports = mongoose.model('User', userSchema)