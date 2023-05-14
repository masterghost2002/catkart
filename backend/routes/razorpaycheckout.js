const router = require('express').Router();
const Razorpay = require("razorpay");
router.post("/payment", async (req, res) => {

    const amount = req.body.amount;
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_HyEy1Cwhwl7xm4',
            key_secret: 'STIrcixcoZKetqyvDlV8QQQF',
        });

        const options = {
            amount: amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        else return res.json(order);
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;