import mongoose from "mongoose";

// database configration 
export const DB  = () => {
    mongoose.connect(process.env.DB || "")
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error))
}