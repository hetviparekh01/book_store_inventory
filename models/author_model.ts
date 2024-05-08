import mongoose,{ Schema } from "mongoose";
import { IAuthor } from "../interfaces/IAuthor";


const AuthorSchema =new Schema<IAuthor>(
    {
        name:{
            type:String,
            required:[true,'name is required']
        },
        biography:{
            type:String,
            required:[true,'biography is required']
        },
        nationality:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Author=mongoose.model('Author',AuthorSchema)
export default Author;