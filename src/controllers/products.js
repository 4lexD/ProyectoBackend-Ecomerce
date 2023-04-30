import ProductManager from "../services/productManager.js";

class ProductController{

    static get = async (req,res) =>{
        try {
            const manager = new ProductManager();
            const result = await manager.getAll();

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

    static getById = async (req,res)=>{
        try {  
            const {id} = req.params;
            const manager = new ProductManager();
            const result = await manager.getOne(id);
            
            res.status(200).send({message:"success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    }

    static post = async (req,res)=>{
        try {
            const { body } = req;
            const manager = new ProductManager();
            const result = await manager.addOne(body);

            res.status(200).send({message: "succes", result});  
        } catch (error) {
            res.status(500).send({error: error.message});
        };
            

    }

    static put = async (req,res)=>{
        try {
            const {id} = req.params;
            const { body } = req;
            const manager = new ProductManager();
            const result = await manager.updateOne(id, body);

            res.status(200).send({message:'success', result});

        } catch (error) {
            res.status(500).send({error: error.message});
        };
    }

    static delete = async (req,res)=>{
        try {
            const {id} = req.params;
            const manager = new ProductManager();
            const result = await manager.deleteOne(id);

            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({error: error.message});
        };
    }
};

export default ProductController;