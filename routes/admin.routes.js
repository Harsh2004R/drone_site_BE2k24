const express = require("express");
const { ProductModel } = require("../models/admin.product.model.js")
const adminRouter = express.Router();
adminRouter.use(express.json())





adminRouter.post("/add/product", async (req, res) => {

    const { cover_img, background_img, discription, background_title, price, category, video_url, images } = req.body;
    try {
        const inserted_product = new ProductModel({
            cover_img, background_img, discription, background_title, price, category
        })
        await inserted_product.save();
        res.status(200).json({ msg: "product added...", inserted_ITEM: inserted_product })
    } catch (error) {
        res.status(401).json({ msg: "failed to add a product in Data Base", error_msg: error.message })
    }

})


adminRouter.get("/get/products", async (req, res) => {
    try {
        const get_products = await ProductModel.find({});

        res.status(200).json({ msg: "product list here...", Products: get_products })
    } catch (error) {
        res.status(401).json({ msg: "failed to get product Data from Data Base", error_msg: error.message })
    }
})




module.exports = { adminRouter }