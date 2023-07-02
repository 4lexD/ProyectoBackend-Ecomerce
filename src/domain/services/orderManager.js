import container from "../../container.js";
import ticketManager from "./ticketManager.js";

class OrderManager {
  constructor() {
    this.carts = container.resolve('CartRepository');
    this.productsRepository = container.resolve('ProductRepository');
    this.tickets = new ticketManager();
  }

  async checkOut(id) {
    const checkoutCart = await this.carts.findById(id);
    let totalAmount = 0;

    for (const products of checkoutCart.products) {
      const product = await this.productsRepository.findById(products.id);
      if (product.stock === 0) {
        throw new Error(`El producto ${product.title} se encuentra sin stock`);
      }
      if (product.stock - products.quantity < 0) {
        throw new Error(
          `No tenemos stock suficiente de ${product.title}, actualmente tenemos ${product.stock}u`
        );
      }
      totalAmount += product.price * products.quantity;
      

      
      const updatedProduct = await this.productsRepository.updateById(product.id, { $inc:{ stock: -products.quantity } });

      if (updatedProduct.stock === 0) {
        updatedProduct.status = false;
        await updatedProduct.save();
      }
    }
    const ticket = this.tickets.create({
      amount: totalAmount,
      purchaser: checkoutCart.user
    });

    await this.carts.delete(id);

    return ticket;
  }
}

export default OrderManager;
