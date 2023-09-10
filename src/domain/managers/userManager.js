
import container from "../../container.js";
import { createHash } from "../../shared/index.js";
import idValidation from "../validations/Schemas/shared/idValidation.js";
import userUpdateValidation from "../validations/Schemas/user/userUpdateValidation.js";
import userValidation from "../validations/Schemas/user/userValidation.js";
class UserManager {
    constructor(){
        this.users = container.resolve('UserRepository');
    }
    async addOne(data){
        await userValidation.parseAsync(data);
        const dto = {
            ...data,password: await createHash(data.password,10)
        }
        const user = await this.users.create(dto);
        return { ...user, password: undefined };
    }

    async getOne(id){
        await idValidation.parseAsync({ id: id });
        return this.users.findOne(id);
    }

    async getOneByEmail(email){
        return this.users.findOneByEmail(email);
    }

    async getAll(paginate){
        return this.users.find(paginate)
    }

    async updateOne(id,data){
        await userUpdateValidation.parseAsync({...data,id});
        return this.users.updateOne(id,data)
    }

    async updateLastConnection(id) {
        const currentTime = new Date();
        const result = await this.users.updateLastConnection(id,currentTime );
    
        return result;
    }
    async userCleanup(){
        return this.users.userCleanup();
    }
}


export default UserManager;