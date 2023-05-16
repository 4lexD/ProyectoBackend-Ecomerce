import UserManager from "../services/userManager.js";

class UserController{
    static getOne = async (req,res)=>{
        try {
            const {id} = req.params;
            const manager = new UserManager();
            
            const result = await manager.getOne(id);
            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static get = async (req,res)=>{
        try {

            const manager = new UserManager();
            
            const result = await manager.getAll();
            res.status(200).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static post = async (req,res)=>{
        try {
            const {body} = req;
            const manager = new UserManager();

            const result = await manager.addOne(body);

            res.status(201).send({message: "success", result});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default UserController;