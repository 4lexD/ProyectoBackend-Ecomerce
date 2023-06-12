import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const roleCollection = 'roles'

const roleSchema = Schema({
    name:{
        type: Schema.Types.String, required: true
    },
    permissions:[{
        type: Schema.Types.String
    }]
});

roleSchema.plugin(paginate);

export const roleModel = model(roleCollection,roleSchema);