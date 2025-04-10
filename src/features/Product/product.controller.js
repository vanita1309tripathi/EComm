import ProductModel from "./product.model.js";
import { userModel } from "../User/user.model.js";
export class ProductController{
    getProducts(req,res,next){
        let products=ProductModel.getAll();
        res.status(200).send(products);
    }
    getOneProduct(req,res,next){

    }
    addProduct(req,res,next){
        // Will post the request through postman for now, in body in JSON format
        console.log(req.body)// this will be undefined to parse it, instally body parser and use middleware in server.js
        ProductModel.add(req.body);
        res.status(200).send("New Product has been added");
    }
    rateProduct(req,res,next){
        const userId=req.query.userId;
        const productId=req.query.productId;
        const rating=req.query.rating;
       let r=ProductModel.rate(userId,productId,rating);
       if(r){
        res.status(200).send("Rating has been added");
       }
       else{
        res.status(400).send("Rating could not be added");
       }


        
    }
    filterProduct(req,res,next){
        //We will use query parameter instead of root parameter
        //the request will look like :../filter?minPrice=10&maxPrice=20
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const product=ProductModel.filter(minPrice,maxPrice);
        res.send(product);
    }
}