import express from "express";
import { trycatch } from "../utils/try-catch";
import { addToWishlist, removeWishlist, viewWishlist } from "../controllers/users/wishlist";
import { product_over_review } from "../controllers/users/products-over-review";
import { users_logins, users_registers } from "../controllers/users/users-auth";

const router = express.Router();

// user auth routes
router.post("/registers",trycatch(users_registers))
router.post('/logins' , trycatch(users_logins))
// wishlist routes

router.get("/:userId/products", trycatch(viewWishlist));
router.post("/:userId/products/:productId", trycatch(addToWishlist));
router.delete("/:userId/products/:productId", trycatch(removeWishlist));

// product over review

router.get("/:productId/products", trycatch(product_over_review));





export default router;