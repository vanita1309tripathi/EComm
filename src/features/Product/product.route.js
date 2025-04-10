import express from "express";
import { ProductController } from "./product.controller.js";
const productController=new ProductController();

const router=express.Router();

router.get('/',productController.getProducts);
router.post('/',productController.addProduct);
router.get('/filter',productController.filterProduct);
router.post('/rate',productController.rateProduct);


export default router;