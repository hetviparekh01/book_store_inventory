import mongoose , {Schema, mongo} from "mongoose";
import {ICategory}  from '../interfaces/ICategory'

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

export default Category