import {userModel} from "../../models/UserModel.js";
import User from "../../../domain/entities/user.js"

class UserMongooseRepository {

    async create(data){
        const userDocument = await userModel.create(data);
        
        return new User({
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age,
            password: userDocument?.password,
            isAdmin: userDocument.isAdmin,
            role: userDocument.role
        });
    }

    async find(paginate){

        const { limit, page } = paginate;
        const userDocument = await userModel.paginate({},{limit,page});

        const {docs, ...pagination} = userDocument;

        const users = docs.map(document => new User({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            isAdmin: document.isAdmin,
            role: document.role
        }));

        return {
            users,
            pagination
        }

    }

    async findOne(id){
        const userDocument = await userModel.findOne({_id:id});

        return new User({
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age,
            password: userDocument?.password,
            isAdmin: userDocument.isAdmin,
            role: userDocument.role
        });
    }

    async findOneByEmail(email){
        const userDocument = await userModel.findOne({ email });

        return new User({
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age,
            password: userDocument?.password,
            isAdmin: userDocument.isAdmin,
            role: userDocument.role
        });

    }
};

export default UserMongooseRepository;