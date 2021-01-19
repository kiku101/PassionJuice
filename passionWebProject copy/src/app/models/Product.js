const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    productName: {
        type: String,
        required: true

    },
    price:{
        type: Number,
    },
    imageURL: {
        type: [String],
        required: true
    },
    description:{
        type: String,
    },
    // number: {
    //     type: Int,
    // }


})

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;