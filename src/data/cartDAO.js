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
            const document = await cartModel.findById(cid).populate('products._id');
            if (!document) return null;
            return {
                products: document.products.map(item => {
                    const { _id: product } = item;
                    return {
                        id: product._id,
                        quantity: item.quantity,
                        title: product.title,
                        description: product.description,
                        code: product.code,
                        price: product.price,
                        status: product.status,
                        stock: product.stock,
                        thumbnail: product.thumbnail,
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    }
    async addToCart(cid, pid) {
        try {
            const document = await cartModel.findOneAndUpdate(
              { _id: cid, 'products._id': pid },
              { $inc: { 'products.$.quantity': 1 } },
              { new: true }
            );
          
            if (!document) {
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

    async delete(id) {
        try {
            const document = await cartModel.findOneAndUpdate(
                { _id: id },
                { $unset: { products: true } },
                { new: true }
            );
            return {
                id: document._id
            }
        } catch (error) {
            throw error;
        }
    }
    async deleteOne(cid, pid) {
        try {
            const document = await cartModel.findByIdAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            )

            return {
                id: document._id
            };
        } catch (error) {
            throw error;
        }
    }

    async updateOne(item, cid, pid) {
        try {
            const document = await cartModel.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $set: { 'products.$.quantity': item.quantity } },
                { new: true }
            );
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
    async update(item, cid) {
        try {
            const document = await cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { 'products': item.products } },
                { new: true }
            );
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
}

export default CartDao;