import mongoose from "mongoose";

// Define the Address Subdocument Schema
const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

// Define the User Schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isPermission : {
        type : Boolean,
        default : false
    } ,
    isDelete: {
        type: Boolean,
        default: false
    },
    addresses: {
        type: [addressSchema]
    },
    wishlist : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
    }]
},{timestamps : true});

// Create the User Model
const Users = mongoose.model("User", usersSchema);

export default Users;
