import { cartModel } from "../models/CartModel.js";


class CartDao {
    async create(data){
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
    }
    async findById(cid){
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
    }
    async addToCart(cid, pid) {

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
    }

    async delete(id) {
        const document = await cartModel.findOneAndUpdate(
            { _id: id },
            { $unset: { products: true } },
            { new: true }
        );
        return {
            id: document._id
        }
    }
    async deleteOne(cid, pid) {

        const document = await cartModel.findByIdAndUpdate(
            { _id: cid },
            { $pull: { products: { _id: pid } } },
            { new: true }
        )

        return {
            id: document._id
         };
    }

    async updateOne(item, cid, pid) {

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
    }
    async update(item, cid) {

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
    }
}

export default CartDao;