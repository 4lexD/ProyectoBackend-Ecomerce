import { paginate } from "mongoose-paginate-v2";
import UserManager from "../../domain/managers/userManager.js";

class UserController{
    static getOne = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const manager = new UserManager();
            
            const result = await manager.getOne(id);
            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static get = async (req,res,next)=>{
        try {
            const paginate = req.query;
            const manager = new UserManager();
            
            const result = await manager.getAll(paginate);
            res.status(200).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }

    static post = async (req,res,next)=>{
        try {
            const {body} = req;
            const manager = new UserManager();

            const result = await manager.addOne(body);

            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e);
        };
    }
}

export default UserController;