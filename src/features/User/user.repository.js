import { getDB } from "../../config/mongodb.js";
import bcrypt from 'bcrypt'
export class userRepository{
    
         async signUp(newUser){
         
           try{
            // 1.Get the database
             const db=getDB();
            // 2. Get the collection :users
            const collection=db.collection("users");
         
            // 3.Insert the document(row),this returns a promise
           await collection.insertOne(newUser);
           return newUser
           }catch(err){
            console.log(err);
           }
        
        }
        async signIn(email,password){
            try{
                const db=getDB();
                const collection=db.collection("users");
                  // await "unwraps" the Promise and gives you the value inside it.
                const user = await collection.findOne({ email });
                if (!user) return null;
            
                const isMatch = await bcrypt.compare(password, user.password);
                return isMatch ? user : null;
              } catch (err) {
                console.log(err);
                return null;
              }
            //   before using hashing
              
            //     const user=await collection.findOne({"email":email,"password":password});
            //     return user;
            // }catch(err){
            //     console.log(err);
            //     return false;
            // }
        }
}