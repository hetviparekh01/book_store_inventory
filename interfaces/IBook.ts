import  {Document, ObjectId} from "mongoose"
export interface IBook extends Document{
    title:string,
    author:ObjectId,
    category:ObjectId,
    ISBN:number,
    description:string,
    price:number
}