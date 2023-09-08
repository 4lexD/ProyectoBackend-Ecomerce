
import container from "../../container.js";
import OrderManager from "./orderManager.js";
import ticketManager from "./ticketManager.js";
class CartManager{
    constructor(){
        this.carts = container.resolve('CartRepository');
        this.order = new OrderManager();
    }

    async addOne(data){
        return this.carts.create(data);
        
    }

    async getById(id){
        return this.carts.findById(id); 
    }

    async addOneToCart(cid,pid){
        return this.carts.addToCart(cid,pid);
    }

    async addUserToCart(cid,uid){
        return this.carts.addUserToCart(cid,uid);
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

    async checkOut(id){
        return this.order.checkOut(id)
    }

};


export default CartManager;