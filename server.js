const express = require("express");
const coupon = require("./db/models/coupon");
const user = require("./db/models/user");

const app = express();

require('./db/config')
app.use(express.json());

app.post("/couponcode", async (req, res) => {
    //
    try {
        const date = new Date(); // Now
        const setDate = date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
        console.log(date);

        const couponName = Math.floor(Math.random() * 10000);
        console.log(couponName);
        const coupons = "PILLAI" + "06" + couponName;
        console.log(coupons);
        const users = await new user({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            couponCode: coupons
        }).save()
        await coupon.create({
            couponID: users._id,
            couponCode: coupons,
            expire: setDate
            // isActive:false
        });

        res.status(200).json({
            users, coupons
        })
        console.log(users);
    }
    catch {
        res.status(400).json("Something went wrong")
    }
})

app.put("/apply", (req, res) => {
    const code = req.body;
    console.log(code);
    const date = new Date(); // Now
    const setDate = date.setDate(date.getDate()+30); // Set now + 30 days as the new date
    console.log(setDate);
    // if (date.setDate !== date.getDate && date.setDate <= date.getDate) {
    //     console.log(setDate,"date")
        const data = coupon.findOne({ couponCode: code.couponCode }, function (err, isActive) {
            console.log(code.couponCode, "coupon");
            console.log(isActive, 'l');
            if (err) {
                console.log(err);
                // return res.redirect("/admin/users-details?error=" + err.toString());
                return res.status(200).json(data)
            }
            coupon.update({ couponCode: code.couponCode }, { $set: { isActive: "false" } }, (err2, result) => {
                console.log(err2, result, "valu");
                if (result.modifiedCount === 1) {
                    // res.redirect("/admin/users-details");
                    res.status(200).json({ data: "Coupon Applied successfully", success: true, code: 200 })
                    console.log(data, 'data')
                }
                else if (result.modifiedCount === 0) {
                    res.status(400).json({ meta: "Coupon Already  Applied ", success: false, code: 400 })
                    console.log(data, 'data1')
                }
            });
        });
    // }
    // else {
    //     res.status(400).json({ meta: "Already expire", success: false, code: 400 })
    //     console.log("Already expire")
    // }

});

const PORT = 9000

app.listen(PORT, () => {
    console.log(`Server starts at ${PORT}`)
})