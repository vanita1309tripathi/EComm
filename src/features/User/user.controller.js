// import { sign } from "jsonwebtoken";

import { userModel } from "./user.model.js";
import jwt from 'jsonwebtoken'
import { userRepository } from "./user.repository.js";
import bcrypt, { hash } from 'bcrypt'

export class userController{
    constructor(){
        this.userRepository=new userRepository();
    }
    // Have to remove static keyword as can't use static with 'this'
    async signUpUser(req, res, next) {
    
        try {
          const { name, email, password } = req.body;
          // creating hashedpassword
          const hashPassword= await bcrypt.hash(password,12);
          const user = new userModel(name,email,hashPassword);
          const createdUser = await this.userRepository.signUp(user); 

          res.send(createdUser);
        } catch (err) {
          console.error("Error during sign up:", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }


      async signInUser(req,res){
        try{
            const {email,password}=req.body;
            const result=await this.userRepository.signIn(email,password);
            console.log("Result:",result);
        if(result)
            { 
                const token=jwt.sign(
                        {userId:result._id,
                          email:result.email
                        },process.env.JWT_SECRET,
                       {
                        expiresIn:'1h'
                       });
                       return res.status(200).send(token);
                    
            }
        else{
            res.status(400).send("Incorrect Creddentials");
        }
        }catch(err){
            console.log(err);
        }
      }
    // static signInUser(req,res,next){

    //     const result=userModel.signIn(req.body.email,req.body.password);
    //     if(!result){
    //         res.status(400).send("Incorrect Creddentials");
    //     }
    //     // If it is valid we are doing JWT Authentication
    //     // 1.npm install jsonwebtoken
    //     const token=jwt.sign({userId:result.id,
    //         email:result.email
    //     },'AuyVfihGQo',
    //    {
    //     expiresIn:'1h'
    //    });
    //    return res.status(200).send(token);
    // }

}
