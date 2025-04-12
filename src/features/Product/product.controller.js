import ProductModel from "./product.model.js";
import { userModel } from "../User/user.model.js";
import { ProductRepository } from "./product.repository.js";
export class ProductController{
    // In Javascript classes properties have to be assigned using 'this'
    constructor(){
        this.productRepository= new ProductRepository();
    }
    async getProduct(req,res,next){
        try{
                const id= req.params.id;
                const product= await this.productRepository.get(id);
                if (!product) {
                    return res.status(404).send("Product not found");
                  }
              
                  res.status(200).send(product);
        }catch(err){
            console.error("Error fetching product:", err);
            res.status(500).send("Internal Server Error");
    }
    }
    async getAllProducts(req,res,next){
        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
          } catch (err) {
            console.error("Error getting products:", err);
            res.status(500).send("Failed to fetch products.");
          }
    }
    
    async addProduct(req,res,next){
      try{
        const {name,desc,price,imageURL}=req.body;
        const newProduct= new ProductModel(name,desc,price,imageURL);

        const product=await this.productRepository.add(newProduct);
        res.status(200).send(product);
    }catch(err){
        console.log(err);
        res.send("Product can't be added")
    }
    }
    
// B4 using MongoDb:

    // getProducts(req,res,next){
    //     let products=ProductModel.getAll();
    //     res.status(200).send(products);
    // }


    // addProduct(req,res,next){
    //     // Will post the request through postman for now, in body in JSON format
    //     console.log(req.body)// this will be undefined- to parse it, install body parser and use middleware in server.js
    //     ProductModel.add(req.body);
    //     res.status(200).send("New Product has been added");
    // }
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