import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
export default class CartRepository{
    async addItem(productID, userID, quantity){
        try{
            const db=getDB();
            const collection=db.collection("cart"); 
            const id=await this.getNextCounter(db);
            console.log("cartId",id);
               // const addedItem=await collection.insertOne({productID:new ObjectId(productID),userId:new ObjectId(userID),quantity});
             // This created new entry for same userId and product and doesn't add up the quantity so, we use update and upsert
      
               const addedItem=await collection.updateOne({productID:new ObjectId(productID),userId:new ObjectId(userID)},
            {   $setOnInsert:{_id:id},
                $inc:{quantity:quantity}},
            {upsert:true}
        );
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
            console.log("Get Cart Items:",cartItems);
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
    async getNextCounter(db){
        const result=await db.collection("counters").findOneAndUpdate({_id:"cartItemId"},
          {
            $inc:{value:1}
          },
          {
            returnDocument:'after'
          }

        )
        console.log("Result:",result);
        console.log(result.value);
        return result.value;
      }
}