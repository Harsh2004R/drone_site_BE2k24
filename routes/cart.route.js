const express = require("express");
const { ProductModel } = require("../models/admin.product.model.js")
const cartRoute = express.Router();
cartRoute.use(express.json())


cartRoute.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const Cart = await ProductModel.findById(id)
        res.status(200).json({ msg: "Here is your cart details", cart: Cart })
        console.log(Cart)
    } catch (error) {
        res.status(405).json({ Error_msg: error.message })
    }
})



module.exports = { cartRoute }