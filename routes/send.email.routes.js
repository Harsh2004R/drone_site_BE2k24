const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const emailRouter = express.Router();
emailRouter.use(express.json());


// sendEmail fnction (Controller) ....
const sendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"Your Name" <${process.env.EMAIL_USER}>`, // sender address
            to: "ojhasoni146@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello user-----xyz?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ msg: `Message sent: ${info.messageId}` });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ error: "Error sending email" });
    }
}


emailRouter.post("/email", sendEmail)


module.exports = { emailRouter, sendEmail };
