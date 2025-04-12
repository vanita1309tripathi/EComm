import express from "express";
import { ProductController } from "./product.controller.js";
const productController=new ProductController();

const router=express.Router();

router.get('/:id',(req,res,next)=>{
    productController.getProduct(req,res,next);
});
router.get('/',(req,res,next)=>{
    productController.getAllProducts(req,res,next);
});
router.post('/',(req,res,next)=>{
    productController.addProduct(req,res,next);
});
router.get('/filter',productController.filterProduct);
router.post('/rate',productController.rateProduct);


export default router;