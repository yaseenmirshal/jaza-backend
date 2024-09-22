import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).array('image');

// Middleware to handle image upload
const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    upload(req, res, async (err: any) => {
        if (err) {
            return res.status(400).json({ message: "File upload error", error: err.message });
        }

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            const file = req.files[0] as Express.Multer.File; // Handle the first file, if multiple are uploaded
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image" }, 
                (error, result) => {
                    if (error) {
                        return next(error);
                    }

                    if (result) {
                        req.body.cloudinaryImageUrl = result.secure_url;
                        next();
                    }
                }
            );

            stream.end(file.buffer); // Pipe the buffer to Cloudinary
        } catch (error) {
            return next(error);
        }
    });
};




export default uploadImage;
