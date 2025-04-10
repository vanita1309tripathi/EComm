
import express from "express";
import { userController } from "./user.controller.js";


const router=express.Router();

router.post('/signUp',userController.signUpUser);
router.post('/signIn',userController.signInUser);

export default router;