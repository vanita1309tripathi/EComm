import { MongoClient } from "mongodb";//MongoClient is a Class--npm i mongodb

const url=process.env.DB_URL;
let client;
const connectTOMongodb=()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client=clientInstance;
        console.log("mongoDb is connected");
        createCounter(client.db());
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
export {getDB, connectTOMongodb};