import { ObjectId } from 'mongoose'
import Book from '../../models/book_model'
import Author from '../../models/author_model';
import Category from '../../models/category_model';

export class BookService {

    async getBooks(searchTerm: any) {

        
        const limitsize = searchTerm.limit || 5;
        const page=searchTerm.page || 1;
        const skip = (page - 1) * limitsize;
      
        let aggregatedata
        
        let dynamicquery={}


        if(Object.entries(searchTerm).length===0){
            aggregatedata= await Book.find({})
        }
       else{
        let regex = { $regex: searchTerm.search, $options: 'i' };
        aggregatedata= await Book.aggregate([
            
            {
              $lookup: {
                from: "authors",
                localField:"author",
                foreignField:"_id",
                as: "author_details"
              }
            },
            {
                $lookup:{
                    from: "categories",
                    localField:"category",
                    foreignField:"_id",
                    as: "category_details"
                }
            },
            {
                $unwind: {
                  path: "$author_details",
                  includeArrayIndex: 'string'
                }
            },
            {
                $unwind:{
                    path: "$category_details",
                    includeArrayIndex: 'string'
                }
            }, 
            // {
            //     $match:filterObject
            // },
            {
                $match:{
                $or:[
                  {"title":regex},
                  {"description":regex},
                  {"author_details.name":searchTerm.filter_author},
                  {"category_details.name":searchTerm.filter_category}
                ]
              }  
            },
            {

                $project:{
                        title:1,
                        description:1,
                        "author_details.name":1,
                        "category_details.name":1,
                        ISBN:1,
                        price:1,


                }
                
            },
            {
                $skip:Number(skip)
            },
            {
                $limit:Number(limitsize)
               
            }
          
    ])
    }   
       
        // console.log(aggregatedata);
        if(aggregatedata){
            return aggregatedata
        }
        else{
            return "no data found"
        }
        // // console.log(searchTerm.search);
        // if (searchTerm.search) {
        //     query.search = { $regex: searchTerm.search, $options: 'i' };
        //     // console.log(query.search);
        //     responsedata = await Book.find({ $or: [{ title: query.search }, { description: query.search }] }).skip(skippage).limit(limitsize);
        //     if (responsedata) {
        //         return responsedata;
        //     } else {
        //         return { message: "no book in the book store" };
        //     }

        // } else if (searchTerm.filter) {
        //     const filteredBooks = await Book.find({
        //         $or: [{ category: searchTerm.filter }, { author: searchTerm.filter }],
        //     });
        //     const authordata = await Author.findById(searchTerm.filter)


        //     if (!authordata) {
        //         // return  { message: "no author in the book store" }
        //         const categorydata = await Category.findById(searchTerm.filter)
        //         if (categorydata) {
        //             return { category_name: categorydata.name, BookData: filteredBooks }
        //         } else {
        //             return { message: "No data available", status: false }
        //         }

        //     } else {

        //         const authorData = await Author.findById(searchTerm.filter)

        //         if (authorData) {
        //             return { Author_name: authorData.name, BookData: filteredBooks }
        //         } else {
        //             return { message: "No data available", status: false }
        //         }
        //     }
        // }
        // else {
        //     const book = await Book.find({}).skip(skippage).limit(limitsize);
        //     return { book, page: `${searchTerm.page}/${book.length}` }
        // }
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