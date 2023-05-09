import CartManager from "../services/cartManager.js";

class CartController{
    static post = async (req,res) =>{
        try {
            const {body} = req;
            const manager = new CartManager();
            const result = await manager.addOne(body);

            res.status(201).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }
    static get = async (req,res) =>{
        try {
            const {id} = req.params;
            const manager = new CartManager();
            const result = await manager.getById(id);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }
    static postInCart = async (req,res) =>{
        try {
            const {cid,pid} = req.params;
            const manager = new CartManager();
            const result = await manager.addOneToCart(cid,pid);

            res.status(201).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }
    
    static delete = async (req,res) =>{
        try {
            const { cid } = req.params;
            const manager = new CartManager();
            const result = await manager.clear(cid);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

    static deleteOne = async (req,res) =>{
        try {
            const { cid, pid } = req.params;
            const manager = new CartManager();
            const result = await manager.clearOne(cid, pid);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

    static put = async (req,res) =>{
        try {
            const { body } = req;
            const { cid } = req.params;
            const manager = new CartManager();
            const result = await manager.update(body, cid);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

    static putOne = async (req,res) =>{
        try {
            const { body } = req;
            const { cid, pid } = req.params;
            const manager = new CartManager();
            const result = await manager.updateOne(body, cid, pid);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

};





export default CartController;