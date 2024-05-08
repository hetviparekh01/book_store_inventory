import { ObjectId } from 'mongoose'
import Book from '../../models/book_model'
import Author from '../../models/author_model';
import Category from '../../models/category_model';

export class BookService {

    async getBooks(searchTerm:any) {
        
        const limitsize = 5;
        const skippage = (searchTerm.page - 1) * limitsize;

        let query:any ={};
        let responsedata:any;
        if(searchTerm.search){
            query.search = { $regex: searchTerm.search, $options: 'i' };
            responsedata = await Book.find({$or:[{title:query.search},{description:query.search}]}).skip(skippage).limit(limitsize);
            if (responsedata) {
                return responsedata; 
            } else {
                return { message: "no book in the book store" };
            }
            
        }else if(searchTerm.filter){
            const filteredBooks = await Book.find({
                $or: [{ category: searchTerm.filter }, { author: searchTerm.filter }],
              });
            const authordata=await Author.findById(searchTerm.filter)


            if(!authordata){
                // return  { message: "no author in the book store" }
                const categorydata=await Category.findById(searchTerm.filter)
                if(categorydata){
                    return {category_name:categorydata.name,BookData : filteredBooks}
                }else{
                    return {message:"No data available" ,status:false}
                }

            }else{
               
                const authorData=await Author.findById(searchTerm.filter)

                if(authorData){
                    return {Author_name:authorData.name,BookData : filteredBooks}
                }else{
                    return {message:"No data available" ,status:false}
                }
            }
        }
        else{ 
            const book=await Book.find({}).skip(skippage).limit(limitsize);
        }
}   
    

    async createBook(title: string, author: ObjectId, category: ObjectId, ISBN: number, description: string, price: number) {
        return await Book.create({ title: title, author: author, category: category, ISBN: ISBN, description: description, price: price })
    }
    async getBookById(id: string) {
        return await Book.findById(id)
    }
    async updateBook(bookid: string, title: string, author: ObjectId, category: ObjectId, ISBN: number, description: string, price: number) {
        return await Book.findByIdAndUpdate(bookid, { title: title, author: author, category: category, ISBN: ISBN, description: description, price: price })
    }
    async deleteBook(bookid: string) {
        return await Book.findByIdAndDelete(bookid)
    }
}