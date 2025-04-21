import { MongoClient } from "mongodb";//MongoClient is a Class--npm i mongodb

const url=process.env.DB_URL;
let client;
const connectTOMongodb=()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client=clientInstance;
        console.log("mongoDb is connected");
        createCounter(client.db());
        createIndex(client.db());
    }).catch(err=>{
        console.log(err);
    })
}
function getDB(){
    return client.db();
}
async function createCounter(db){
    const existingCounter=await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId',value:0})
    }
}
async function createIndex(db){
  try{
    // Price:1 means ascending order and -1 means decending order
    await db.collection("products").createIndex({price:1});
    // tect based index
    await db.collection("products").createIndex({desc:"text"});
  }catch(err){
    console.log(err);
  }
  console.log("Indexes are created");
}
export {getDB, connectTOMongodb};