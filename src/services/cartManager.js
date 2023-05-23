import CartDao from "../data/cartDAO.js";

class CartManager{
    constructor(){
        this.carts = new CartDao();
    }

    async addOne(data){
        return this.carts.create(data);
    }

    async getById(id){
        return this.carts.findById(id)  
    }

    async addOneToCart(cid,pid){
        return this.carts.addToCart(cid,pid)
    }

    async clear(id) {
        return this.carts.delete(id);
    }

    async clearOne(cid, pid) {
        return this.carts.deleteOne(cid, pid);
    }

    async updateOne(product, cid, pid) {
        return this.carts.updateOne(product, cid, pid);
    }

    async update(product, cid) {
        return this.carts.update(product, cid);
    }

};


export default CartManager;