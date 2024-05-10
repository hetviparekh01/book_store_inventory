
import Author from '../../models/author_model'

export class AuthorService{
    async getAuthors(searchTerm:any) {
        const limitsize=5
        const skippage=(searchTerm.page-1)*limitsize

        let query:any ={};
        let responsedata:any;

        if(searchTerm.search){
            query.search = { $regex: searchTerm.search, $options: 'i' };
            responsedata = await Author.find({$or:[{name:query.search},{biography:query.search}]}).skip(skippage).limit(limitsize);
          
            if (responsedata.length!==0) {
                return responsedata; 
            }
             else {
                return { message: "No author found matching the search term" };
            }
            
        }
       const data= await Author.find({}).skip(skippage).limit(limitsize);
       
       if(data.length !== 0){
           return data
       }
       else{
           return {message:"author is not found in this page"}
       }
    }
    async createAuthor(name: string,biography:string,nationality:string) {
        return await Author.create({ name:name,biography:biography,nationality:nationality})
    }
    async getAuthorById(id: string) {
        return await Author.findById(id)
    }
    async updateAuthor(authorid:string,name: string,biography:string,nationality:string) {
        return await Author.findByIdAndUpdate(authorid,{ name:name,biography:biography,nationality:nationality})
    }
    async deleteAuthor(authorid: string) {
        return await Author.findByIdAndDelete(authorid)
    }
}