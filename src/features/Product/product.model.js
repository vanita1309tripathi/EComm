import { userModel } from "../User/user.model.js";
export default class ProductModel{
    constructor(_name,_desc,_price,_imageUrl){
        // this.id=_id;
        this.name=_name;
        this.desc=_desc;
        this.price=_price;
        this.imageURL=_imageUrl;

    }
    // B4 MongoDb:
    // static getAll(){
    //     return products;
    // }
    // static add(product){
       
    //    product.id=  products.length + 1,
    //     console.log("New Product:",product);
    //     products.push(product);
    // }
    static filter(minPrice,maxPrice){
        let product=products.filter(f=>(
            f.price>=minPrice&&f.price<=maxPrice
        ));
        return product;//array.filter creates an array of all the items which match the condition
    }
    static rate(userId,productId,rating){
        // Validate User
        let user=userModel.getUsers().find(u=>u.id==userId);
        if(!user){
            console.log("User not found") ;
            return false;
        }
        //Validate product
        let product=products.find(p=>p.id==productId);
        if(!product){
            console.log("Product not found")
            return false;
        }
        //If rating is not given for this product by any user at all, add rating:
        if(!product.ratings){
            product.ratings=[{
                userId:userId,
                rating:rating
            }]  
            return true;
        }
        // If user is updating their rating,ceck if user rating is available
        const existingRatingIndex=product.ratings.findIndex(r=>r.userId==userId);

       if(existingRatingIndex>=0){
        product.ratings[existingRatingIndex]={userId:userId,rating:rating};
       }

    //    If any new user is giving a rating
       else{
        product.ratings.push({
            userId:userId,
            rating:rating
        })
       }
return true;

    }
}
var products=[new ProductModel(1,"Smartphone","Latest model with advanced features",699,"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"),
    new ProductModel(2,"Headphones","Wireless with noise cancellation",199,"https://media.istockphoto.com/id/2158075207/photo/asian-woman-listening-to-music-with-wireless-headphones.webp?a=1&b=1&s=612x612&w=0&k=20&c=UkXxzEcHlD6ZQJ2C8ZwCJltWmbujUtpYzhe9OfDBIl0="),
    new ProductModel(3,"Gaming Laptop","High-performance laptop for gaming",1499,"https://plus.unsplash.com/premium_photo-1681666713677-8bd559bef6bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")   
]