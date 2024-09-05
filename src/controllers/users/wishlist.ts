
// import { Request, Response } from "express";
// import createError from "http-errors";
// import User from "../../models/users-schema"
// import Products from "../../models/products-schema";
// import Wishlist from "../../models/wishlist-schema";


// // Get all wishlist products in users schema

// export const viewWishlist = async (req: Request, res: Response): Promise<Response> => {
//   const { userId } = req.params;
  
//     const user = await User.findById(userId).populate({
//       path: 'Wishlist',
//       populate: { path: 'products' }
//     });

//     if (!user ) {
//       throw new createError.NotFound("User not found");

//     }
//     if (!user.wishlist || user.wishlist.length === 0) {
//         throw new createError.NotFound("User wishlist is empty");
//     }

//     return res.status(200).json({ status: "OK", message: "Wishlist product founded", data: user.wishlist});
// };


// // Add to cart  wishlist

// export const addToWishlist = async (req: Request, res: Response): Promise<Response> => { 
//     const { productId, userId } = req.params;

//     // Find user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new createError.NotFound("User not found");
//     }

//     // Find product by ID
//     const product = await Products.findById(productId);
//     if (!product) {
//         throw new createError.NotFound("Product not found");
//     }

//     // Check if the product is already in the wishlist
//     let wishlistItem = await Wishlist.findOne({ users: user._id, products: product._id });
//     if (wishlistItem) {
//         throw new createError.Conflict("Product already exists in the wishlist");
//     }

//     // Create a new wishlist item
//     wishlistItem = await Wishlist.create({
//         user: user._id,
//         product: product._id,
//     });

//     // Add the wishlist products
//     await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: wishlistItem._id } });

//     return res.status(200).json({ status: "Ok", message: "Product added to wishlist successfully" });
// };

// // Remove a product from the user's wishlist

// export const removeWishlist = async (req: Request, res: Response): Promise<Response> => {
//     const { productId , userId } = req.params;

//     // Find user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new createError.NotFound("User not found");
//     }

//     // Find product by ID
//     const product = await Products.findById(productId);
//     if (!product) {
//         throw new createError.NotFound("Product not found");
//     }

//     // Find and delete wishlist item
//     const wishlistProduct = await Wishlist.findOneAndDelete({ users: user._id, products: product._id });
//     if (!wishlistProduct) {
//         throw new createError.NotFound("Product not found in the user's wishlist");
//     }

//     // Update the user's wishlist array 
//     await User.findByIdAndUpdate(userId, { $pull: { wishlist: wishlistProduct._id } });

//     return res.status(200).json({ status: "Ok", message: "Product removed from wishlist successfully" });
// };
