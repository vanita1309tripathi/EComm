import express from "express"
import './env.js'
import swagger from 'swagger-ui-express'
// import apiDocs from './swagger.json' assert { type: 'json' } 
// No import assertion used

import { readFile } from 'fs/promises';
import jwtAuth from "./src/middleware/jwt.middleware.js";
import {getDB,connectTOMongodb} from "./src/config/mongodb.js";

import bodyParser from "body-parser";
import userRouter from "./src/features/User/user.route.js"
import productRouter from "./src/features/Product/product.route.js"
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import orderRouter from "./src/features/Order/order.routes.js";
import cors  from 'cors';

// For hashing passwords:npm i bcrypt

// For environment var:npm i dotenv
import dotenv from 'dotenv' // Make .env file, include it in gitignore and declare env var. there, to load those env variable:
const server=express();
dotenv.config();




// Swagger 2.0// For swagger 3.0 I can see the video
const apiDocs = JSON.parse(
    await readFile(new URL('./swagger.json', import.meta.url))
  );
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));
server.use(bodyParser.json());
// CORS policy with library: install cors,import and:
server.use(cors());
// CORS policy without library
// server.use((req,res,next)=>{
//     res.header("Aceess-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","*");
//     res.header("Access-Control-Allow-Methods","*");
//     // return ok for preflight request
//     if(req.method=="OPTIONS"){
//         res.sendStatus(200);
//     } 
//     next();
// })
// Router
server.use('/api/product',productRouter)
server.use('/api/user',userRouter)

server.use('/api/cartItems', jwtAuth, cartRouter);
server.use('/api/orders',jwtAuth,orderRouter);

// Default route
server.get('/',(req,res)=>{
    res.send("Welcome to Ecomm Website")
})

// Keep it at the end if none of the route is hit
server.use((req,res)=>{
    res.status(404).send("API Not Found");
})

server.listen(3200,()=>{
    console.log("Server listening at port 3200");
    connectTOMongodb();
})