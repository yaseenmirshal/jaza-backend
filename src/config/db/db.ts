import mongoose from "mongoose";
import logger from "../../utils/logger/logger";

// Database configuration
export const DB = async () => {
    try {
        await mongoose.connect(process.env.DB || "");
        logger.info("Database connected successfully");
    } catch (error) {
        logger.error("Database connection failed:", error);
        process.exit(1); 
    }
};
