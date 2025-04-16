import { ReturnDocument } from 'mongodb';
import CartIemModel from './cartItems.model.js';
import CartRepository from './cartItems.repository.js';
export class CartItemsController {
    constructor() {
        this.cartRepository = new CartRepository();
      }
    
      async add(req, res,next) {
        try {
          const { productID, quantity } = req.body;
          const userID = req.userId;
          console.log(userID);
          const addedItem = await this.cartRepository.addItem(productID, userID, quantity);
          res.status(201).json({ message: 'Cart updated', item: addedItem });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
      async get(req, res,next) {
        try {
         
          const userID = req.userId;
          const cartItems = await this.cartRepository.getItem(userID);
          res.status(201).send(cartItems);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
     
    
      async delete(req, res,next) {
        try {
          const { cartItemID } = req.body;
          const userID = req.userId;
          const isDeleted=await this.cartRepository.deleteItem(cartItemID, userID);
          if(isDeleted){
            res.status(200).json({ message: 'Item removed from cart' });
          }
          else{
            res.send("product Not Found")
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
      
    
    // delete(req, res) {
    //     const userID = req.userID;
    //     const cartItemID = req.params.id;
    //     const error = CartIemModel.delete(
    //     cartItemID,
    //     userID
    //     );
    //     if (error) {
    //     return res.status(404).send(error);
    //     }
    //     return res
    //     .status(200)
    //     .send('Cart Item is removed');
    //     }
        
}
