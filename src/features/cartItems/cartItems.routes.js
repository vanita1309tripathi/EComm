// 1. Import express.
import express from 'express';
import { CartItemsController } from './cartItems.controller.js';
// 2. Initialize Express router.
const cartRouter = express.Router();
const cartController = new CartItemsController();
cartRouter.post('/', cartController.add);
export default cartRouter;
