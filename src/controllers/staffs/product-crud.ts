import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'; 
import Products from "../../models/products-schema";
import createError from "http-errors";
import { productCreateJ, productUpdateJ } from "../../utils/validation/products";
import { ValidationError } from "joi";


interface CreateProduct  {
    name: string,
    description: string,
    stock: number,
    categories: string,
    sex: string,
    size: string,
    price: number
}

interface UpdateProduct  {
    name?: string,
    description?: string,
    stock?: number,
    categories?: string,
    sex?: string,
    size?: string,
    price?: number
}

// Create Product
export const createProducts = async (req: Request, res: Response): Promise<Response> => {

        const { error, value: productData } = productCreateJ.validate(req.body) as { value: CreateProduct ; error: ValidationError };


        if (error) {
            throw new createError[400](error.details[0].message);
        }
      

        const newProduct = new Products({
            ...productData,
            image: req.body.cloudinaryImageUrl,
        });

        await newProduct.save();
        return res.status(201).json({ status: "created", message: "Product created successfully" });
   
};



// Update Product
const extractPublicId = (url: string): string => url.split("/").pop()?.split(".")[0] || "";

export const updateProducts = async (req: Request, res: Response): Promise<Response> => {
    const product = await Products.findById(req.params.id);
    if (!product) throw new createError.NotFound("Product not found");

    const { error, value: productData } = productUpdateJ.validate(req.body) as { value: UpdateProduct; error: ValidationError };
    if (error) throw new createError.BadRequest(error.details[0].message);

    if (req.body.cloudinaryImageUrl && product.image) {
        await cloudinary.uploader.destroy(extractPublicId(product.image)); 
    }

    const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        { ...productData, image: req.body.cloudinaryImageUrl || product.image },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) throw new createError.InternalServerError("Failed to update product");

    return res.status(200).json({
        status: "Ok",
        message: "Product successfully updated",
        data: updatedProduct
    });
};


// Delete Product

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {

        const product = await Products.findById(req.params.id);

        if (!product) throw new createError.NotFound("Product not found");

        if (product.image) {
            const imagePublicId = product.image.split('/').pop()?.split('.')[0];

            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }
        }

        await product.deleteOne();

        return res.status(200).json({
            status: "Ok",
            message: "Product and associated image deleted successfully"
        });
   
};
