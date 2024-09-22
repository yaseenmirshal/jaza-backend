import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    permissionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
    }]
}, {timestamps: true});

const Role = mongoose.model("role", rolesSchema);
export default Role;
