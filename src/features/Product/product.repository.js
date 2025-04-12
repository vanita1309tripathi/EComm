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
}
 export {ProductRepository}