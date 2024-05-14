import mongoose , {Schema} from "mongoose";
import {ICategory}  from '../interfaces'

const CategorySchema=new Schema<ICategory>(
    {
        name:{
            type:String,
            required:[true,'name is required']
        }
    },
    {
        timestamps:true,
    }
)
const Category=mongoose.model('Category',CategorySchema)

export  {Category}