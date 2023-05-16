import {Schema, model} from 'mongoose';

const userCollection = 'users';

const userSchema = Schema({

    firstName:{
        type: Schema.Types.String,
        required:true
    },
    lastName:{
        type:Schema.Types.String,
        required: true
    },
    password:{
        type: Schema.Types.String,
        required:true
    },
    email:{
        type: Schema.Types.String,
        unique: true,
        required:true
    },
    role:{
        type: Schema.Types.String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status:{
        type: Schema.Types.Boolean,
        default:true
    }
}, 
{
    timestamps: true
});

export const userModel = model(userCollection,userSchema);
