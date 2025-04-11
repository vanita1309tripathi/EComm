import { MongoClient } from "mongodb";//MongoClient is a Class--npm i mongodb

const url=process.env.DB_URL;
let client;
const connectTOMongodb=()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client=clientInstance;
        console.log("mongoDb is connected");
    }).catch(err=>{
        console.log(err);
    })
}
function getDB(){
    return client.db();
}
export {getDB, connectTOMongodb};