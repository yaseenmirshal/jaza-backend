import mongoose from "mongoose";

const products_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        enum: [ "oils", "fragrances"],
        default: undefined
    },
    sex: {
        type: String,
        enum: [ "men", "women", "unisex"],
        default: undefined 
    },
    size: {
        type: String,
        enum: ["10ml", "50ml","100ml"],
        default: undefined 
    },
    quantity: {
        type: Number,
        default: 1
    }

}, {timestamps: true});

const Products = mongoose.model("Product", products_schema)
export default Products;
