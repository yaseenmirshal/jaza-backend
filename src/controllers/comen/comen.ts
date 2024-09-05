import { Request, Response } from "express";
import Products from "../../models/products-schema";
import createError from "http-errors";


// View All Products
export const allProducts = async (req: Request, res: Response): Promise<Response> => {

    const { category, size, name, sex, minPrice, maxPrice, price } = req.query;

    if(!req.query){

            
            const allProducts = await Products.find();
            if (!allProducts.length) throw new createError.NotFound("No products found");
            
            return res.status(200).json({ status: "Ok", message: "Products found", data: allProducts });
    }
    else{

                const matchStage: any = {};
        
                // Filtering by category
                if (category) matchStage.categories = category;
        
                // Filtering by name (case-insensitive)
                if (name) matchStage.name = { $regex: new RegExp(name as string, 'i') };
        
                // Filtering by sex
                if (sex) matchStage.sex = sex;
        
                // Filtering by size
                if (size) {
                    
                    const sizeArray = (size as string).split(',').map(s => s.trim());
                    matchStage.size = { $in: sizeArray };
                }
        
                // Filtering by price range (inclusive)
                if (minPrice || maxPrice) {
                    matchStage.price = {};
                    if (minPrice) matchStage.price.$gte = parseFloat(minPrice as string);
                    if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice as string);
                }
        
                // Filtering by exact price (if provided)
                if (price) {
                    matchStage.price = parseFloat(price as string);
                }
        
                // Aggregation pipeline
                const allProducts = await Products.aggregate([
                    { $match: matchStage }, 
                    {
                        $lookup: {
                            from: 'anotherCollection', 
                            localField: '_id',
                            foreignField: 'productId',
                            as: 'relatedData'
                        }
                    },
                    { $sort: { createdAt: -1 } } 
                ]);
        
                if (!allProducts.length) throw new createError.NotFound("No products found");
        
                return res.status(200).json({ status: "Ok", message: "Products found", data: allProducts });
    }

};



// View Product by ID
export const viewProductById = async (req: Request, res: Response): Promise<Response> => {

    const product = await Products.findById(req.params.id);
    if (!product) throw new createError.NotFound("No products found");
    return res.status(200).json({ status: "Ok", message: "Product found", data: product });

};