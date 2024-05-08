
import mongoose,{ Schema } from "mongoose";
import { IBook } from "../interfaces/IBook";

const BookSchema =new Schema<IBook>(
    {
        title: {
            type: String,
            required:[true,'title is required'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Author',
            required: [true,'author is required']
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:[true,'category is required'],
        },
        ISBN:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
            required:false,
        },
        price:{
            type:Number,
            required:true,
        }
    },
    {
        timestamps: true
    }
)

const Book =mongoose.model('Book',BookSchema)



export default Book;
