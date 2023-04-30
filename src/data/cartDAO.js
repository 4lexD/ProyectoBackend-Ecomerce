import { cartModel } from "../models/CartModel.js";


class CartDao {
    async create(data){
        try {
            const document = await cartModel.create(data);
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    }
    async findById(cid){
        try {
            const document = await cartModel.findById(cid);
            if (!document) return null;
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    }
    async addToCart(cid, pid) {
        try {
            const updateProducts = await cartModel.findOneAndUpdate(
              { _id: cid, 'products._id': pid },
              { $inc: { 'products.$.quantity': 1 } },
              { new: true }
            );
          
            if (!updateProducts) {
              await cartModel.updateOne(
                { _id: cid },
                { $push: { products: { _id: pid, quantity: 1 } } }
              );
            }
          
            const cart = await cartModel.findById(cid);
            const { _id: id, products } = cart;
          
            const response = {
              id,
              products: products.map(({ _id, quantity }) => ({ id: _id, quantity }))
            };
          
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default CartDao;