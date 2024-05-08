import mongoose,{ Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema= new Schema<IUser>(
  {
    name:{
        type:String,
        // required:[true,'name is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    role:{
        type:String,
        required:[true,'role is required']
    },
    refreshtoken:{
      type:String,
      required:false
    }
  },
  {
    timestamps:true
  }
)

const User=mongoose.model('User',UserSchema)

export default User