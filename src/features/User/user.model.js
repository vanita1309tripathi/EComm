import { getDB } from "../../config/mongodb.js";
export class userModel{
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;    }


    static async signUp(name,email,password){
      let newUser;
       try{
        // 1.Get the database
         const db=getDB();
        // 2. Get the collection :users
        const collection=db.collection("users")
        newUser=new userModel(
            name,
            email,
            password
        );
        // users.push(newUser); No need to work with users array anymore and neither assign id

        // 3.Insert the document(row),this returns a promise
       await collection.insertOne(newUser);
       }catch(err){
        console.log(err);
       }
    //    When a function is marked as async, JavaScript automatically wraps the return value in a Promise — no matter what you return.
    // so this newUser will be wrapper as a Promise and I have to use await
       return newUser;
    }
    static signIn(email,password){
        let user=users.find(u=>u.email==email&&u.password==password);
        return user;
    }
    static getUsers(){
        return users;
    }
}
let users=[new userModel("Vanita","test@email.com","Password")];