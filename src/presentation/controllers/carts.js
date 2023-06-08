import CartManager from "../../domain/services/cartManager.js";

class CartController{
    static post = async (req,res,next) =>{
        try {
            const {body} = req;
            const manager = new CartManager();
            const result = await manager.addOne(body);

            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }
    static get = async (req,res,next) =>{
        try {
            const {id} = req.params;
            const manager = new CartManager();
            const result = await manager.getById(id);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }
    static postInCart = async (req,res,next) =>{
        try {
            const {cid,pid} = req.params;
            const manager = new CartManager();
            const result = await manager.addOneToCart(cid,pid);

            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }
    
    static delete = async (req,res,next) =>{
        try {
            const { cid } = req.params;
            const manager = new CartManager();
            const result = await manager.clear(cid);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static deleteOne = async (req,res,next) =>{
        try {
            const { cid, pid } = req.params;
            const manager = new CartManager();
            const result = await manager.clearOne(cid, pid);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static put = async (req,res,next) =>{
        try {
            const { body } = req;
            const { cid } = req.params;
            const manager = new CartManager();
            const result = await manager.update(body, cid);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static putOne = async (req,res) =>{
        try {
            const { body } = req;
            const { cid, pid } = req.params;
            const manager = new CartManager();
            const result = await manager.updateOne(body, cid, pid);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

};





export default CartController;