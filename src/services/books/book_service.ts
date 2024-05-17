import { Book } from "@models";
import {
     FatalErrorMessage,
     errorMessage,
     successMessage,
} from "@constants";
import { IResponseType,IBook} from "@interfaces";
import { searchQuery,paginationQueryLimit, paginationQuerySkip } from "@utils";

export class BookService {
     // async getBooks(searchTerm: any): Promise<IResponseType> {
     //     try {
     //         const limitsize = searchTerm.limit || 5;
     //         const page = searchTerm.page || 1;
     //         const skip = (page - 1) * limitsize;
     //         let responsedata;

     //         let filterObject_author:any={}
     //         let filterObject_category:any={}
     //         let matchObject:any={}
     //         let regex = { $regex: searchTerm.search, $options: 'i' };
     //         if(searchTerm.filter_author ){
     //             filterObject_author["author_details.name"]=searchTerm.filter_author
     //         }
     //         if(searchTerm.filter_category){
     //             filterObject_category["category_details.name"]=searchTerm.filter_category
     //         }
     //         if(searchTerm.search){
     //             matchObject["$or"]=[
     //                 {"title": regex},
     //                 {"description":regex},
     //             ]
     //         }
     //         if (Object.entries(searchTerm).length === 0) {
     //             responsedata = await Book.find({})
     //         }
     //         else {
     //             // let regex = { $regex: searchTerm.search, $options: 'i' };
     //             responsedata = await Book.aggregate([
     //                 {
     //                     $lookup: {
     //                         from: "authors",
     //                         localField: "author",
     //                         foreignField: "_id",
     //                         as: "author_details"
     //                     }
     //                 },
     //                 {
     //                     $lookup: {
     //                         from: "categories",
     //                         localField: "category",
     //                         foreignField: "_id",
     //                         as: "category_details"
     //                     }
     //                 },
     //                 {
     //                     $unwind: {
     //                         path: "$author_details",
     //                         includeArrayIndex: 'string'
     //                     }
     //                 },
     //                 {
     //                     $unwind: {
     //                         path: "$category_details",
     //                         includeArrayIndex: 'string'
     //                     }
     //                 },
     //                 {
     //                     $match:filterObject_author
     //                 },
     //                 {
     //                     $match:filterObject_category
     //                 },
     //                 {
     //                     $match:matchObject
     //                 },
     //                 {
     //                     $project: {
     //                         title: 1,
     //                         description: 1,
     //                         "author_details.name": 1,
     //                         "category_details.name": 1,
     //                         ISBN: 1,
     //                         price: 1,
     //                     }

     //                 },
     //                 {
     //                     $skip: Number(skip)
     //                 },
     //                 {
     //                     $limit: Number(limitsize)

     //                 }
     //             ])
     //         }
     //         // console.log(responsedata.length);
     //         if (responsedata) {
     //             return { status: true, content: responsedata,length:responsedata.length }
     //         }
     //         else {
     //             throw new Error(FatalErrorMessage.DataNotFound)
     //         }
     //     } catch (error: any) {
     //         return { status: false, content: error.message }
     //     }
     //     // // console.log(searchTerm.search);
     //     // if (searchTerm.search) {
     //     //     query.search = { $regex: searchTerm.search, $options: 'i' };
     //     //     // console.log(query.search);
     //     //     responsedata = await Book.find({ $or: [{ title: query.search }, { description: query.search }] }).skip(skippage).limit(limitsize);
     //     //     if (responsedata) {
     //     //         return responsedata;
     //     //     } else {
     //     //         return { message: "no book in the book store" };
     //     //     }

     //     // } else if (searchTerm.filter) {
     //     //     const filteredBooks = await Book.find({
     //     //         $or: [{ category: searchTerm.filter }, { author: searchTerm.filter }],
     //     //     });
     //     //     const authordata = await Author.findById(searchTerm.filter)

     //     //     if (!authordata) {
     //     //         // return  { message: "no author in the book store" }
     //     //         const categorydata = await Category.findById(searchTerm.filter)
     //     //         if (categorydata) {
     //     //             return { category_name: categorydata.name, BookData: filteredBooks }
     //     //         } else {
     //     //             return { message: "No data available", status: false }
     //     //         }

     //     //     } else {

     //     //         const authorData = await Author.findById(searchTerm.filter)

     //     //         if (authorData) {
     //     //             return { Author_name: authorData.name, BookData: filteredBooks }
     //     //         } else {
     //     //             return { message: "No data available", status: false }
     //     //         }
     //     //     }
     //     // }
     //     // else {
     //     //     const book = await Book.find({}).skip(skippage).limit(limitsize);
     //     //     return { book, page: `${searchTerm.page}/${book.length}` }
     //     // }
     // }
     async getbook(searchTerm: any): Promise<IResponseType> {
          try {
               let regex = { $regex: searchTerm?.search, $options: "i" };

               let feildArray:any[][]=[]
               let and:object[]=[]
               let or:object[]=[]
               
               if(searchTerm.search){
                    or.push({'title':regex},{'description':regex})
               }
               if(searchTerm.filter_author){
                   and.push({"author_details.name":searchTerm.filter_author})
               }
               if(searchTerm.filter_category){
                    and.push({"category_details.name":searchTerm.filter_category})
               }
              
               feildArray.push(or,and);
               let dynamicquery=searchQuery(feildArray as any,searchTerm)
               let paginationskipquery=paginationQuerySkip(searchTerm)
               let paginationlimitquery=paginationQueryLimit(searchTerm)
               // console.log(dynamicquery);

               
               // let dynamicquery: any = {
               //      $match: {},
               // };
               // let regex = { $regex: searchTerm.search, $options: "i" };
               // let $and = [{}];

               // console.log(searchTerm.filter_author);
               // if (searchTerm.filter_author) {
               //      $and.push({
               //           "author_details.name": searchTerm.filter_author,
               //      });
               // }
               // console.log($and);

               // if (searchTerm.filter_category) {
               //      $and.push({
               //           "category_details.name": searchTerm.filter_category,
               //      });
               // }
               // dynamicquery.$match = {
               //      ...dynamicquery.$match,
               //      $and,
               // };
               // if (searchTerm.search) {
               //      dynamicquery.$match = {
               //           ...dynamicquery.$match,
               //           $or: [
               //                { title: regex },
               //                { description: regex },
               //           ],
               //      };
               // }


               // console.log(dynamicquery);
             
               let responsedata = await Book.aggregate([
                    {
                         $lookup: {
                              from: "authors",
                              localField: "author",
                              foreignField: "_id",
                              as: "author_details",
                         },
                    },
                    {
                         $lookup: {
                              from: "categories",
                              localField: "category",
                              foreignField: "_id",
                              as: "category_details",
                         },
                    },
                    {
                         $unwind: {
                              path: "$author_details",
                              // includeArrayIndex: "string",
                         },
                    },
                    {
                         $unwind: {
                              path: "$category_details",
                              // includeArrayIndex: "string",
                         },
                    },
                    {
                         $addFields: {
                           date: {
                             $dateToString:{
                               format:"%Y-%m-%d",
                               date:"$createdAt"
                             }
                           }
                         }
                    },
                    dynamicquery,
                    {
                         $project: {
                              title: 1,
                              description: 1,
                              "author_details.name": 1,
                              "category_details.name": 1,
                              ISBN: 1,
                              price: 1,
                              date:1,
                         },
                    },
                    paginationskipquery,
                    paginationlimitquery
               ]);
               
               if (responsedata) {
                    return {
                         status: true,
                         content: responsedata,
                         length: responsedata.length,
                    };
               } else {
                    throw new Error(FatalErrorMessage.DataNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async createBook(bookdata: IBook): Promise<IResponseType> {
          try {
               const responsedata = await Book.create({
                    title: bookdata.title,
                    author: bookdata.author,
                    category: bookdata.category,
                    ISBN: bookdata.ISBN,
                    description: bookdata.description,
                    price: bookdata.price,
               });

               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SucessfullyBookCreated,
                    };
               } else {
                    throw new Error(errorMessage.ErrorInCreatingBook);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async getBookById(id: string): Promise<IResponseType> {
          try {
               const responsedata = await Book.findById(id);
               if (responsedata) {
                    return { status: true, content: responsedata };
               } else {
                    throw new Error(FatalErrorMessage.BookNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async updateBook(bookid: string, bookdata: IBook): Promise<IResponseType> {
          try {
               const responsedata = await Book.findByIdAndUpdate(bookid, {
                    title: bookdata.title,
                    author: bookdata.author,
                    category: bookdata.category,
                    ISBN: bookdata.ISBN,
                    description: bookdata.description,
                    price: bookdata.price,
               });
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyBookUpdated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.BookNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async deleteBook(bookid: string): Promise<IResponseType> {
          try {
               const responsedata = await Book.findByIdAndDelete(bookid);
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyBookDeleted,
                    };
               } else {
                    throw new Error(FatalErrorMessage.BookNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
