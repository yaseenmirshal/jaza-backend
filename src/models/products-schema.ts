import mongoose from "mongoose";

const products_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true       
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
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
        default: undefined,
        required: true
    },
    sex: {
        type: String,
        enum: [ "men", "women", "unisex"],
        require: true
    },
    size: [{
        type: String,
        enum: ["10ml", "50ml","100ml"],
        default: undefined,
        required: true
    }],
    quantity: {
        type: Number,
        default: 1
    }

}, {timestamps: true});

const Products = mongoose.model("Product", products_schema)
export default Products;
