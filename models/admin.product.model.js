const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    cover_img: { type: String, require: true },
    background_img: String,
    discription: { type: String, require: true },
    background_title: String,
    price: { type: String, require: true },
    category: String,
    video_url: String,
    images: [String],
}, { timestamps: true })

const ProductModel = mongoose.model('product', productSchema);

module.exports = {ProductModel};