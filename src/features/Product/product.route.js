import express from "express";
import { ProductController } from "./product.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
const productController=new ProductController();

const router=express.Router();

router.get('/filter', (req, res, next) => {
    productController.filterProduct(req, res, next);
});

router.post('/rate', jwtAuth,(req, res, next) => {
    console.log("Inside the rate Route")
    productController.rateProduct(req, res, next);
});

router.get('/', (req, res, next) => {
    productController.getAllProducts(req, res, next);
});

router.post('/', (req, res, next) => {
    productController.addProduct(req, res, next);
});

router.get('/:id', (req, res, next) => {
    console.log("Inside the get Route")
    productController.getProduct(req, res, next);
});

export default router;