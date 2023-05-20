import { userModel } from "../models/UserModel.js";

class UserDao {

    async create(data){
        try {
            const userDocument = await userModel.create(data);
            return {
                id: userDocument._id,
                fistName: userDocument.fistName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                password: userDocument.password
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async find(){
        try {
            const userDocument = await userModel.find();

            return userDocument.map(document => ({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                role: document.role
            }));

        } catch (error) {
                        console.error(error)
            throw error;
        }
    }

    async findOne(id){

        try {
            const userDocument = await userModel.findOne(id);

            return {
                id: userDocument._id,
                fistName: userDocument.fistName,
                lastName: userDocument.lastName,
                email: userDocument.email
            }

        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async findOneByEmail(email){

        try {
            const userDocument = await userModel.findOne({ email });

            return {
                id: userDocument._id,
                fistName: userDocument.fistName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                password: userDocument.password,
                role: userDocument.role
            }

        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default UserDao;