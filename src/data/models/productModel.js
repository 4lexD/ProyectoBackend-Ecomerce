import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productCollection = 'products'
const productSchema = Schema({
    title:{
        type: Schema.Types.String,
        required:[true, 'titulo es un campo obligatorio']
    },
    description:{
        type: Schema.Types.String,
        required:[true, 'descripcion es un campo obligatorio']
    },
    price:{
        type: Schema.Types.Number,
        required:[true, 'precio es un campo obligatorio']
    },
    thumbnail:{
        type: Schema.Types.String,
        required:[true, ' imagen es un campo obligatorio']
    },
    code:{
        type: Schema.Types.String,
        required:[true, 'code es un campo obligatorio'],
        unique:true
    },
    stock:{
        type: Schema.Types.Number,
        required:[true, 'stock es un campo obligatorio']
    },
    status:{
        type: Schema.Types.Boolean,
        default: true
    }
});
productSchema.plugin(paginate);

export const productModel = model(productCollection,productSchema);