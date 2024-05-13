
import { errorMessage,FatalErrorMessage,successMessage } from '../../constants/message'
import { IAuthor } from '../../interfaces/IAuthor'
import { IResponseType } from '../../interfaces/IResponseType'
import Author from '../../models/author_model'

export class AuthorService{
    async getAuthors(searchTerm:any):Promise<IResponseType>{
    try {
        const limitsize=searchTerm.limit || 5
        const page=searchTerm.page || 1
        const skip=(page-1)*limitsize
        let responsedata:any;
       


        if(Object.entries(searchTerm).length===0){
            responsedata=await Author.find({})
        }
        else{
            let regex={$regex:searchTerm.search,$options:'i'}
            responsedata=await Author.aggregate([
                {
                    $match:{
                        $or:[
                            {"nationality":searchTerm.filter_nationality},
                            {"name":regex}
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
        // let query:any ={};
        // if(searchTerm.search){
        //     query.search = { $regex: searchTerm.search, $options: 'i' };
        //     responsedata = await Author.find({$or:[{name:query.search},{biography:query.search}]}).skip(skippage).limit(limitsize);
          
        //     if (responsedata.length!==0) {
        //         return responsedata; 
        //     }
        //      else {
        //         return { message: "No author found matching the search term" };
        //     }
            
        // }
        //    const data= await Author.find({}).skip(skippage).limit(limitsize);
       
        //    if(data.length !== 0){
        //        return data
        //   }
        //    else{
        //        return {message:"author is not found in this page"}
        //    }
    }
    async createAuthor(authordata:IAuthor):Promise<IResponseType>{
        try {
            const responsedata=  await Author.create({ name:authordata.name,biography:authordata.biography,nationality:authordata.nationality})
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyAuthorCreated}
            }else{
                throw new Error(FatalErrorMessage.AuthorNotFound)
            }
        } catch (error:any) {
            return { status: false, content: error.message }
        }
    }
    async getAuthorById(id: string) {
        try {
            const responsedata=  await Author.findById(id)
            if(responsedata){
                return {status:true,content:responsedata}
            }else{
                throw new Error(FatalErrorMessage.AuthorNotFound)
            } 
        } catch (error:any) {
            return { status: false, content: error.message } 
        }
    }
    async updateAuthor(authorid:string,authordata:IAuthor) {
        try {
        const responsedata= await Author.findByIdAndUpdate(authorid,{ name:authordata.name,biography:authordata.biography,nationality:authordata.nationality})
        if(responsedata){
            return {status:true,content:successMessage.SuccessfullyAuthorUpdated}
        }else{
            throw new Error(FatalErrorMessage.AuthorNotFound)
        }
        } catch (error:any) {
            return { status: false, content: error.message }   
        }
    }
    async deleteAuthor(authorid: string) {
        try {
            const responsedata=await Author.findByIdAndDelete(authorid)
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyAuthorDeleted}
            }else{
                throw new Error(FatalErrorMessage.AuthorNotFound)
            }
        } catch (error:any) {
            return { status: false, content: error.message }     
        }
    }
}