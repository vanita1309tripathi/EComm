// import { sign } from "jsonwebtoken";
import { userModel } from "./user.model.js";
import jwt from 'jsonwebtoken'

export class userController{
    static async signUpUser(req, res, next) {
        try {
          const { name, email, password } = req.body;
          const user = await userModel.signUp(name, email, password);
          res.send(user);
        } catch (err) {
          console.error("Error during sign up:", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    static signInUser(req,res,next){
        const result=userModel.signIn(req.body.email,req.body.password);
        if(!result){
            res.status(400).send("Incorrect Creddentials");
        }
        // If it is valid we are doing JWT Authentication
        // 1.npm install jsonwebtoken
        const token=jwt.sign({userId:result.id,
            email:result.email
        },'AuyVfihGQo',
       {
        expiresIn:'1h'
       });
       return res.status(200).send(token);
    }

}
