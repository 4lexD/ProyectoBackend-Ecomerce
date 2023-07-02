import RoleManager from "../../domain/services/roleManager.js";

class RoleController{

    static post = async (req,res,next) =>{
        try {
            const manager = new RoleManager();
            const role = await manager.addOne(req.body);
        
            res.status(201).send({ message: 'success', role, message: 'Role created.'});
        } catch (e) {
            next(e);
        };
    }
    
    static get = async (req,res,next) =>{
        try {
            const { limit, page } = req.query;
            const manager = new RoleManager();
            const roles = await manager.addOne({ limit, page });

            res.status(200).send({message: "success",roles: roles.docs, ...roles, docs: undefined});

        } catch (e) {
            next(e);
        };
    }

    static getOne = async (req,res,next) =>{
        try {

            const { id } = req.params;
            const manager = new RoleManager();
            const role = await manager.getOne(id);

            res.status(200).send({message: "success",role });
        } catch (e) {
            next(e);
        };
    }

    static update = async (req,res,next) =>{
        try {
            const { id } = req.params;

            const manager = new RoleManager();
            const result = await manager.updateOne(id, req.body);
        
            res.status(201).send({ message: 'success', result, message: 'Role updated.' });
        } catch (e) {
            next(e);
        };
    }

    static delete = async (req,res,next) =>{
        try {
            const { id } = req.params;

            const manager = new RoleManager();
            await manager.deleteOne(id);
        
            res.send({ message: 'success', message: 'Role deleted.' });
        } catch (e) {
            next(e);
        };
    }


}

export default RoleController;

