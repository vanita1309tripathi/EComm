import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
export default class CartRepository{
    async addItem(productID, userID, quantity){
        try{
            const db=getDB();
            const collection=db.collection("cart"); 
            const addedItem=await collection.insertOne({productID:new ObjectId(productID),userId:new ObjectId(userID),quantity});
            console.log("added Item in the cart:",addedItem);
            return addedItem;
        }
        catch(err){
            console.log(err);
            throw err;
        }

    }
    async getItem(userID){
        try{
            const db=getDB();
            const collection=db.collection("cart"); 
            const cartItems=await collection.find({userId:new ObjectId(userID)}).toArray();
            console.log("Get Vt Cart Items:",cartItems);
            return cartItems;
        }
        catch(err){
            console.log(err);
            throw err;
        }

    }
    async deleteItem(cartItemId,userID){
        try{
            const db=getDB();
            const collection=db.collection("cart"); 
            const result=await collection.deleteOne({userId:new ObjectId(userID),_id:new ObjectId(cartItemId)})
            return result.deletedCount>0;// deletedCount is a property on the result returned by MongoDB's deleteOne() or deleteMany() methods.
        }
        catch(err){
            console.log(err);
            throw err;
        }

    }
}