import express from "express";
import { trycatch } from "../utils/try-catch";
import {   createProducts, deleteProduct, updateProducts } from "../controllers/staffs/product-crud";
import uploadImage from "../middlewares/file-handlers";
import { allProducts, viewProductById } from "../controllers/comen/comen";

const router = express.Router();



router.post("/products", uploadImage, trycatch(createProducts));
router.get("/products",  trycatch(allProducts));
router.get("/:id/products",  trycatch(viewProductById));
router.put("/:id/products", uploadImage, trycatch(updateProducts));
router.delete("/:id/products",  trycatch(deleteProduct));



export default router;