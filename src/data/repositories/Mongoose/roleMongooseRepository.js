import {roleModel}from "../../models/roleModel.js";
import Role from "../../../domain/entities/role.js";

class RoleMongooseRepository{

    async create(data){
        const roleDocument = await roleModel.create(data);

        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        );
    }

    async getAll(paginate){

        const { limit, page } = paginate;
        const roleDocuments = await roleModel.paginate({},{limit, page});
        const {docs, ...pagination} = roleDocuments;

        const roles = docs.map( document => new Role(
            document._id,
            document.name
        ));

        return {
            roles,
            pagination
        };
    } 

    async getOne(id){
        const roleDocument = await roleModel.findOne({ _id: id });

        if(!roleDocument){
            throw new Error('Role dont exist.');
        }

        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        );
    } 

    async updateOne(id,data){
        const roleDocument = await roleModel.findOneAndUpdate({_id:id},data, {new:true});

        if(!roleDocument){
            throw new Error('role dont exist.')
        }

        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        );
    }
    async deleteOne(id){
        return roleDocument = await roleModel.deleteOne({_id:id});
    }
}

export default RoleMongooseRepository;