class Cart {
    constructor({ id, products , user}) {
      this.id = id;
      this.user = user
      this.products = products.map(product => new CartProduct(product));
    }
}
  
class CartProduct {
    constructor({ id, quantity, title, description, code, price, status, stock, thumbnail }) {
      this.id = id;
      this.quantity = quantity;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.status = status;
      this.stock = stock;
      this.thumbnail = thumbnail;
    }
}
  
export default Cart;
