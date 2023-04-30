import CartDao from "../data/cartDAO.js";

class CartManager{
    constructor(){
        this.carts = new CartDao();
    }

    async addOne(data){
        try {
            return this.carts.create(data);
        } catch (error) {
            throw error;
        };
    }

    async getById(id){
        try {
          return this.carts.findById(id)  
        } catch (error) {
            throw error;
        };
    }

    async addOneToCart(cid,pid){
        try {
            return this.carts.addToCart(cid,pid)
        } catch (error) {
            throw error;
        };
    }
};

export default CartManager;