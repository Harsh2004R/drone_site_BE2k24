const express = require('express');
require("dotenv").config()
const bodyParser = require('body-parser');
const crypto = require("crypto")
const Razorpay = require("razorpay");
const { Razorpay_Payment } = require('../models/razorpay.model.js')
const paymentRouter = express.Router();
paymentRouter.use(express.json());
paymentRouter.use(express.urlencoded({ extended: true }));

// Creating razorpay instance here...
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
});


paymentRouter.get("/get/key", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_ID,
    })
})


paymentRouter.post("/checkout", async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            throw new Error("Amount is required");
        }

        const options = {
            // converting usd $ to rupees ₹
            amount: amount * 1000, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            order: order,
        });
        console.log(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            message: 'An error occurred during the checkout process',
            error: error.message
        });
    }
})


paymentRouter.post("/paymentVerification", async (req, res) => {
    try {
        console.log('Request body:', req.body);  // Loging the request body

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log("sig rec", razorpay_signature);
        console.log("sig gen", expectedSignature);

        if (expectedSignature === razorpay_signature) {
            // here we add signature to data base....

            await Razorpay_Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })

            // redirect user to success page...
            res.redirect(`http://192.168.188.120:5000/success/payment?reference=${razorpay_payment_id}`)
        } else {
            return res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'An error occurred during the payment verification process',
            success: false,
            error: error.message
        });
    }
})
module.exports = { paymentRouter };