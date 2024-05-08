import Category from '../../models/category_model'


export class CategoryService{
    async getCategories(searchTerm:any) {
    
        const limitsize=5
        const skippage=(searchTerm.page-1)*limitsize
        
        let query:any ={};
        let responsedata:any;
        if(searchTerm.search){
            query.search = { $regex: searchTerm.search, $options: 'i' };
            responsedata = await Category.find({$or:[{name:query.search}]}).skip(skippage).limit(limitsize);
            if (responsedata) {
                return responsedata; 
            } else {
                return { message: "No Category found matching the search term" };
            }
        }

        const data=await Category.find({}).skip(skippage).limit(limitsize);
        
        if(data.length !== 0){
            return data
        }
        else{
            return {message:"no categories found in this page"}
        }

    }
    async createCategory(name: string) {
        return await Category.create({ name:name})
    }
    async getCategoryById(id: string) {
        return await Category.findById(id)
    }
    async updateCategory(categoryid:string,name: string) {
        return await Category.findByIdAndUpdate(categoryid,{ name:name})
    }
    async deleteCategory(categoryid: string) {
        return await Category.findByIdAndDelete(categoryid)
    }
}