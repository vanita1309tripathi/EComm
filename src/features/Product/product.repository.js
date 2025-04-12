import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductRepository{

    async get(id){
        try{
            const db=getDB();
        const collection=db.collection("products");
        const product = await collection.findOne({ _id: new ObjectId(id) });
        return product;
        }catch(err){
            console.log(err);
        }
    }
    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection("products");
            const products = await collection.find().toArray(); // fetch all documents
            return products;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    async add(newProduct){
        try{
            const db=getDB();
            const collection=db.collection("products");
            const product=await collection.insertOne(newProduct);
            return product;//this will return a promise as add is an async function and an async function always return Promise
        }catch(err){
            console.log(err);
        }
    }
async filter(minPrice,maxPrice){
    try{
        const db=getDB();
        const collection=db.collection("products");
        let filterExpression={};
        
        if(minPrice)   //if minPrice is provided for filtering
        {
            filterExpression.price={$gte:parseFloat(minPrice)}
            console.log("Filter Expression:",filterExpression);
        }
        if(maxPrice)
        {
            filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)}
            console.log("Filter Expression:",filterExpression);
        }
        const result=await collection.find(filterExpression).toArray();
        console.log(result);
        return result;
          

    }catch(err){
            console.log(err);
    }
}
    async rate(userId,productId,rating){
        try{
            const db=getDB();
            const collection=db.collection("products");
            await collection.updateOne({_id:new ObjectId(productId)},
            {
                $push: {ratings:{userId,rating}}
            })
          
        }catch(err){
            console.log(err);
            throw err;
    }
    }

}
 export {ProductRepository}