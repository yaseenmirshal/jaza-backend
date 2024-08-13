import Products from "../../models/products-schema";
import { Request, Response } from "express";
import createError from "http-errors";

// product all details show

export const product_over_review = async (req: Request, res: Response): Promise<Response> => {
    const { productId } = req.params;
    
        // finding product 
      const product = await Products.findById(productId);
  
      if (!product) {
        throw new createError.NotFound("Product not found");
  
      }

      return res.status(200).json({ status: "OK", message: "Peroduct founded", data: product});
  };