import mongoose from "mongoose";

const wishlist_schema = new mongoose.Schema({
    user: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", wishlist_schema);
export default Wishlist;
