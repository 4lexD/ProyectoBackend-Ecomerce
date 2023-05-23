import { userModel } from "../models/UserModel.js";

class UserDao {

    async create(data){
        const userDocument = await userModel.create(data);
        return {
            id: userDocument._id,
            fistName: userDocument.fistName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            password: userDocument.password
        }
    }

    async find(){
        const userDocument = await userModel.find();

        return userDocument.map(document => ({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            role: document.role
        }));
    }

    async findOne(id){
        const userDocument = await userModel.findOne(id);

        return {
            id: userDocument._id,
            fistName: userDocument.fistName,
            lastName: userDocument.lastName,
            email: userDocument.email
        }
    }

    async findOneByEmail(email){
        const userDocument = await userModel.findOne({ email });

        return {
            id: userDocument._id,
            fistName: userDocument.fistName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            password: userDocument.password,
            role: userDocument.role
        }

    }
};

export default UserDao;