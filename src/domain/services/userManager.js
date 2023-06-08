import UserDao from "../../data/daos/userDAO.js";

class UserManager {
    constructor(){
        this.users = new UserDao();
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

    async getAll(){
        return this.users.find()
    }
}

export default UserManager;