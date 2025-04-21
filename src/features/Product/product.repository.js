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
        // We can use more filters like $in, $and, $or
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
        // Projection Operator & $slice to include first 2 rating from the ratings array
        const result=await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:2}}).toArray();
        console.log(result);
        return result;
        //Similarly we can use aggregate operator and use $group.$avg,$push to filter out fields and group them
        //Refer to Aggregation Pipeline 2 video

    }catch(err){
            console.log(err);
    }
}

// Rating Products:To avoid race condition
async rate(userId,productId,rating){
    try{
        const db=getDB();
        const collection=db.collection("products");
       

        await collection.updateOne({_id:new ObjectId(productId)},
        {
            $pull: {ratings:{userId:new ObjectId(userId)}}
        })
        console.log("Adding ratings",rating);
        await collection.updateOne({_id:new ObjectId(productId)},
        {
           
            $push: {ratings:{userId:new ObjectId(userId),rating:rating}}
        })
        

    }catch(err){
        console.log(err);
        throw err;
}
}

    // async rate(userId,productId,rating){
    //     try{
    //         const db=getDB();
    //         const collection=db.collection("products");
    //         let product=await collection.findOne({_id:new ObjectId(productId)});
    //         // Conditional Chaining ?. :Used to safely access properties of an object that might be null or undefined,instead of throwing error

    //         let userRating=  product?.rating?.find(r=>r.userId==userId);
    //         if(userRating){
    //             await collection.updateOne({_id:new ObjectId(productId),"ratings.userId":new ObjectId(userId)},
    //             {
    //                 $set:{"ratings.$.rating":rating}
    //             }
    //         )
    //         }
    //         else{
    //             await collection.updateOne({_id:new ObjectId(productId)},
    //             {
    //                 $push: {ratings:{userId,rating}}
    //             })
    //         }

    //     }catch(err){
    //         console.log(err);
    //         throw err;
    // }
    // }

}
 export {ProductRepository}