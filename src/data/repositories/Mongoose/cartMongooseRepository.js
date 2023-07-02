import { cartModel } from "../../models/CartModel.js";
import Cart from "../../../domain/entities/cart.js";


class CartMongooseRepository {
  async create(data) {
    const document = await cartModel.create(data);
    const cart = new Cart({
      id: document._id,
      user: document.user,
      products: document.products.map(item => ({
        id: item._id,
        quantity: item.quantity
      }))
    });
    return cart;
  }

  async findById(cid) {
    const document = await cartModel.findById(cid).populate('products._id').populate({
    path: 'user',
    select: 'email ' 
  });
    if (!document) return null;

    const cart = new Cart({
      user: document.user.email,
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
        };
      })
    });

    return cart;
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

    const updatedCart = new Cart({
      id,
      products: products.map(({ _id, quantity }) => ({ id: _id, quantity }))
    });

    return updatedCart;
  }
  
  async addUserToCart(cid, uid) {
    const cart = await cartModel.findByIdAndUpdate(cid, { user: uid }, { new: true }).populate({
      path: 'user',
      select: 'email' 
    });
  
    if (!cart) {
      throw new Error("Cart not found");
    }
  

  
    return new Cart({
      id: cart._id,
      user: cart.user.email,
      products: cart.products.map(item => ({
        id: item._id,
        quantity: item.quantity
      }))
    });
  }
  

  async delete(id) {
    await cartModel.findOneAndUpdate(
      { _id: id },
      { $unset: { products: true } },
      { new: true }
    );

    return new Cart({ id: id, products: [] });
  }

  async deleteOne(cid, pid) {
    await cartModel.findByIdAndUpdate(
      { _id: cid },
      { $pull: { products: { _id: pid } } },
      { new: true }
    );

    return new Cart({ id: cid, products: [] });
  }

  async updateOne(item, cid, pid) {
    const document = await cartModel.findOneAndUpdate(
      { _id: cid, 'products._id': pid },
      { $set: { 'products.$.quantity': item.quantity } },
      { new: true }
    );

    const updatedCart = new Cart({
      id: document._id,
      products: document.products.map(item => ({
        id: item._id,
        quantity: item.quantity
      }))
    });

    return updatedCart;
  }

  async update(item, cid) {
    const document = await cartModel.findOneAndUpdate(
      { _id: cid },
      { $set: { 'products': item.products } },
      { new: true }
    );

    const updatedCart = new Cart({
      id: document._id,
      products: document.products.map(item => ({
        id: item._id,
        quantity: item.quantity
      }))
    });

    return updatedCart;
  }
}

export default CartMongooseRepository;

