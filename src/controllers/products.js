import ProductManager from "../services/productManager.js";

class ProductController{

    static get = async (req,res,next) =>{
        try {

            const paginate = req.query;
            const manager = new ProductManager();
            const result = await manager.getAll(paginate);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static getById = async (req,res,next)=>{
        try {  
            const {id} = req.params;
            const manager = new ProductManager();
            const result = await manager.getOne(id);
            
            res.status(200).send({message:"success", result});
        } catch (e) {
            next(e);
        };
    }

    static post = async (req,res,next)=>{
        try {
            const { body } = req;
            const manager = new ProductManager();
            const result = await manager.addOne(body);

            res.status(200).send({message: "succes", result});  
        } catch (e) {
            next(e);
        };
    }

    static put = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const { body } = req;
            const manager = new ProductManager();
            const result = await manager.updateOne(id, body);

            res.status(200).send({message:'success', result});

        } catch (e) {
            next(e);
        };
    }

    static delete = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const manager = new ProductManager();
            const result = await manager.deleteOne(id);

            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }
};

export default ProductController;