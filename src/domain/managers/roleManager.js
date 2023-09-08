import container from "../../container.js";
import roleUpdateValidation from "../validations/Schemas/role/roleUpdateValidation.js";
import roleValidation from "../validations/Schemas/role/roleValidation.js";
import idValidation from "../validations/Schemas/shared/idValidation.js";

class RoleManager{
    constructor(){
        this.role = container.resolve('RoleRepository');
    }

    async addOne(data){
        await roleValidation.parseAsync(data);
        return this.role.create(data);
    }

    async getAll(pagination){
        return this.role.getAll(pagination);
    }

    async getOne(id){
        await idValidation.parseAsync(id);
        return this.role.getOne(id);
    }

    async updateOne(id,data){
        await roleUpdateValidation.parseAsync(...data,id);
        return this.role.updateOne(id,data);
    }

    async deleteOne(id){
        await idValidation.parseAsync(id);
        return this.role.deleteOne(id);
    }


}

export default RoleManager;