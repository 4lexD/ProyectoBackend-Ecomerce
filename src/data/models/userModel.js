import {Schema, model} from 'mongoose';
import paginate from 'mongoose-paginate-v2';


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
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
    age: {
        type: Schema.Types.Number,
        default: 18
    },
    role:{ 
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'roles'
    },
    isAdmin: { 
        type: Schema.Types.Boolean,
        default: false 
    },
    status:{
        type: Schema.Types.Boolean,
        default:true
    },
    last_connection:{
        type: Schema.Types.Date,
        require:false
    }
}, 
{
    timestamps: true
});

 userSchema.plugin(paginate);

 userSchema.pre('find', function () {
    this.populate(['role']);
  });

  userSchema.pre('findOne', function () {
    this.populate(['role']);
  });

export const userModel = model(userCollection,userSchema);
