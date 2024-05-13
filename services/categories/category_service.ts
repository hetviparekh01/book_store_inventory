import { FatalErrorMessage, successMessage } from '../../constants/message';
import { ICategory } from '../../interfaces/ICategory';
import { IResponseType } from '../../interfaces/IResponseType';
import Category from '../../models/category_model'


export class CategoryService{
    async getCategories(searchTerm:any):Promise<IResponseType>{
    
        try {
            const limitsize=searchTerm.limit || 5
            const page=searchTerm.page || 1
            const skip=(page-1)*limitsize
            let responsedata:any;
          
    
    
            if(Object.entries(searchTerm).length===0){
                responsedata=await Category.find({})
            }
            else{
                let regex={$regex:searchTerm.search,$options:'i'}
                responsedata=await Category.aggregate([
                    {
                        $match:{
                            $or:[
                                {"name":regex},
                                {"nationality":regex}
                            ]
                        }
                    },
                    {
                        $project:{
                            name:1,
                            biography:1,
                            nationality:1
                        }
                    },
                    {
                        $skip: Number(skip)
                    },
                    {
                        $limit: Number(limitsize)
    
                    }
                ])
            }
            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error(FatalErrorMessage.DataNotFound)
            }
        }
        catch (error:any) {
            return { status: false, content: error.message }
        }
    }
    async createCategory(categorydata:ICategory):Promise<IResponseType>{
        try {
            const responsedata=await Category.create({ name:categorydata.name})
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyCategoryCreated}
            }else{
                throw new Error(FatalErrorMessage.CategoryNotFound)
            }
        } catch (error:any) {
            return { status: false, content: error.message }
        }
       
    }
    async getCategoryById(id: string):Promise<IResponseType>{
        try {
            const responsedata=  await Category.findById(id)
            if(responsedata){
                return {status:true,content:responsedata}
            }else{
                throw new Error(FatalErrorMessage.CategoryNotFound)
            } 
        } catch (error:any) {
            return { status: false, content: error.message } 
        }
    }
    async updateCategory(categoryid:string,categorydata:ICategory):Promise<IResponseType>{
        try {
            const responsedata= await Category.findByIdAndUpdate(categoryid,{ name:categorydata.name})
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyCategoryUpdated}
            }else{
                throw new Error(FatalErrorMessage.CategoryNotFound)
            }
            } catch (error:any) {
                return { status: false, content: error.message }   
            } 
    }
    async deleteCategory(categoryid: string):Promise<IResponseType>{
        try {
            const responsedata=await Category.findByIdAndDelete(categoryid)
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyCategoryDeleted}
            }else{
                throw new Error(FatalErrorMessage.CategoryNotFound)
            }
        } catch (error:any) {
            return { status: false, content: error.message }     
        }
    }
}