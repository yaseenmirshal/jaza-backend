import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    module: {
        type: [String],
        enum: ['staff'], 
        required: true
    },
    roleRead: {
        type: Boolean,
        default: false
    },
    roleUpdate: {
        type: Boolean,
        default: false
    },
    roleDelete: {
        type: Boolean,
        default: false
    },
    roleCreate: {
        type: Boolean,
        default: false
    }
});

const Permission = mongoose.model("permission", permissionSchema);
export default Permission;
