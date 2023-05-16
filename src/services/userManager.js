import UserDao from "../data/userDAO.js";

class UserManager {
    constructor(){
        this.users = new UserDao();
    }
    async addOne(data){
        try {
            return this.users.create(data)
        } catch (error) {
            throw error
        }
    }

    async getOne(id){
        try {
            return this.users.findOne(id);
        } catch (error) {
            throw error
        }
    }

    
    async getOneByEmail(email){
        try {
            return this.users.findOneByEmail(email);
        } catch (error) {
            throw error
        }
    }

    async getAll(){
        try {
            return this.users.find()
        } catch (error) {
            throw error
        }
    }
}

export default UserManager;