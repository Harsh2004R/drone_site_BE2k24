
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model.js")
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(express.json());

// User registration route
userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password
        const hash = await bcrypt.hash(password, 5);

        // Create a new user with the hashed password
        const new_user = new UserModel({ email: email, password: hash });
        await new_user.save();

        res.status(200).json({ msg: "New user added", new_user: req.body });
    } catch (error) {
        res.status(500).json({ msg: "Failed to add new user", error: error.message });
    }
});

// User login route
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Comparing the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Creating a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ msg: "Login successful", token: token });
    } catch (error) {
        res.status(500).json({ msg: "Login failed", error: error.message });
    }
});

module.exports = {
    userRouter
};
