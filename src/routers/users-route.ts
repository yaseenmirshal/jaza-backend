import express from "express";
import { trycatch } from "../utils/try-catch";
import { addToWishlist, removeWishlist, viewWishlist } from "../controllers/users/wishlist";

const router = express.Router();


router.get("/:userId/products", trycatch(viewWishlist));
router.post("/:userId/products/:productId", trycatch(addToWishlist));
router.get("/:userId/products/:productId", trycatch(removeWishlist));

export default router;