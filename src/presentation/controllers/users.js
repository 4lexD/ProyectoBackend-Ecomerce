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

    static delete = async (req,res,next)=>{

        try {
            const {id} = req.params;
            const manager = new UserManager();
            
            const result = await manager.deleteUser(id);
    
            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e)
        }
    }

    static put = async (req,res,next)=>{
        try {
            const {id} = req.params;
            const {body} = req;

            const manager = new UserManager();
            
            const result = await manager.updateOne(id,body);
    
            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e)
        }
    }

    static addRole = async (req,res,next)=>{
        try {
            const {uid,rid} = req.params;

            const manager = new UserManager();
            
            const result = await manager.addRole(uid,rid);
    
            res.status(201).send({message: "success", result});
        } catch (e) {
            next(e)
        }
    }
}

export default UserController;