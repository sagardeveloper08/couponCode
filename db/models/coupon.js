const mongoose = require('mongoose')


const couponSchema = new mongoose.Schema({
    // couponId:"Number",
    couponCode: "String",
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    created: {
        type: Date,
        default: Date.now()
    },
    expire: {
        type: Date,
        // default:Date.now()
    },
    isActive: { type: Boolean, require: true, default: true }
})

// function date() {
//     var date = new Date(); // Now
//     date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
//     console.log(date);
// }
module.exports = mongoose.model('Coupon', couponSchema)