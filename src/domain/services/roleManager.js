import container from "../../container.js";

class RoleManager{
    constructor(){
        this.role = container.resolve('RoleRepository');
    }

    async addOne(data){
        return this.role.create(data);
    }

    async getAll(pagination){
        return this.role.getAll(pagination);
    }

    async getOne(id){
        return this.role.getOne(id);
    }

    async updateOne(id,data){
        return this.role.updateOne(id,data);
    }

    async deleteOne(id){
        return this.role.deleteOne(id);
    }


}

export default RoleManager;