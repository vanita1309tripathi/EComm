// 1. Import express.
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';
// 2. Initialize Express router.
const cartRouter = express.Router();
const cartController = new CartItemsController();
cartRouter.post('/', (req,res,next)=>{
    cartController.add(req,res,next);
});
cartRouter.get('/', (req,res,next)=>{
    cartController.get(req,res,next);
});
cartRouter.delete('/', (req,res,next)=>{
    cartController.delete(req,res,next);
});
export default cartRouter;
