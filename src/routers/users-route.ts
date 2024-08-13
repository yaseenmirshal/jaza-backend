import express from "express";
import { trycatch } from "../utils/try-catch";
import { addToWishlist, removeWishlist, viewWishlist } from "../controllers/users/wishlist";
import { product_over_review } from "../controllers/users/products-over-review";

const router = express.Router();


// wishlist routes

router.get("/:userId/products", trycatch(viewWishlist));
router.post("/:userId/products/:productId", trycatch(addToWishlist));
router.delete("/:userId/products/:productId", trycatch(removeWishlist));

// product over review

router.get("/:productId/products", trycatch(product_over_review));





export default router;