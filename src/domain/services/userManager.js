
import container from "../../container.js";
class UserManager {
    constructor(){
        this.users = container.resolve('UserRepository');
    }
    async addOne(data){
        return this.users.create(data)
    }

    async getOne(id){
        return this.users.findOne(id);
    }

    async getOneByEmail(email){
        return this.users.findOneByEmail(email);
    }

    async getAll(paginate){
        return this.users.find(paginate)
    }

    async updateOne(id,data){
        return this.users.updateOne(id,data)
    }
}

export default UserManager;