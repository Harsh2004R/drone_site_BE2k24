const express = require('express');
require("dotenv").config()
const bodyParser = require('body-parser');
const crypto = require("crypto")
const Razorpay = require("razorpay");
const { Razorpay_Payment } = require('../models/razorpay.model.js');
const { UserModel } = require('../models/user.model.js');
const { sendEmail } = require("../routes/send.email.routes.js")
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
        const { amount, uid } = req.body;
        if (!amount) {
            throw new Error("Amount is required");
        }

        const options = {
            // converting usd $ to rupees ₹
            amount: amount * 1000, // amount in the smallest currency unit
            currency: "INR",
            receipt: uid,
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

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log('Request body:', req.body); // Loging the request body

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




paymentRouter.post("/sendPaymentMail", async (req, res) => {
    const { email, reff_id } = req.body
    try {
        const user = await UserModel.findOne({ email });
        // res.status(200).json({ msg: "true" ,loggedIn:user})
        if (user) {
            // return res.status(200).json({ message: 'User found' });
            const emailResponse = await sendEmail({
                to: email,
                subject: "Purchase Confirmation",
                email: { orderId: reff_id}
            });
            if (emailResponse.success) {
                return res.status(200).json({ msg: "email successfully sent to user", email: email })
            } else {
                return res.status(500).json({ msg: "Failed to send purchase confirmation email", error: emailResponse.error });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });

        }

    } catch (error) {
        res.status(400).json({ msg: "req failed || denied bt server..." })
    }


    // res.status(200).json({ msg: "true" })
    // console.log( "email", email, "reff_id", reff_id)
})










module.exports = { paymentRouter };