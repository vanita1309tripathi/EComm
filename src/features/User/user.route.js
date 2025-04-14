
import express from "express";
import { userController as UserController } from "./user.controller.js";

const userController=new UserController();
const router=express.Router();

router.post('/signUp',(req,res)=>{
    userController.signUpUser(req,res);
});
router.post('/signIn',(req,res)=>{
    console.log("Inside /signIn route"); 
    userController.signInUser(req,res);
});

export default router;