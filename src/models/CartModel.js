import { Schema, model } from "mongoose";

const cartCollection = 'Carts'
const cartSchema = Schema({
   products:{
    type:[{
        _id:{
            type: Schema.Types.ObjectId,
            required:[true,"id del producto es un campo obligatorio"]
        },
        quantity:{
            type: Schema.Types.Number,
            required:[true, "se requiere cantidad"]
        }
    }],
    required: [true, "producto requerido "]
   }
});

export const cartModel = model(cartCollection,cartSchema);