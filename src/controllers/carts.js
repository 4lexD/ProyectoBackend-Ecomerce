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
    
};

export default CartController;