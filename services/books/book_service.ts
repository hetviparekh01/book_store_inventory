import { ObjectId } from 'mongoose'
import Book from '../../models/book_model'
import { FatalErrorMessage, errorMessage, successMessage } from '../../constants/message';
import { IResponseType } from '../../interfaces/IResponseType';
import { IBook } from '../../interfaces/IBook';

export class BookService {
    async getBooks(searchTerm: any): Promise<IResponseType> {
        try {
            const limitsize = searchTerm.limit || 5;
            const page = searchTerm.page || 1;
            const skip = (page - 1) * limitsize;
            let responsedata
            let dynamicquery = {}
            if (Object.entries(searchTerm).length === 0) {
                responsedata = await Book.find({})
            }
            else {
                let regex = { $regex: searchTerm.search, $options: 'i' };
                responsedata = await Book.aggregate([
                    {
                        $lookup: {
                            from: "authors",
                            localField: "author",
                            foreignField: "_id",
                            as: "author_details"
                        }
                    },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
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
                        $unwind: {
                            path: "$category_details",
                            includeArrayIndex: 'string'
                        }
                    },
                    // {
                    //     $match:filterObject
                    // },
                    {
                        $match: {
                            $or: [
                                { "title": regex },
                                { "description": regex },
                                { "author_details.name": searchTerm.filter_author },
                                { "category_details.name": searchTerm.filter_category }
                            ]
                        }
                    },
                    {
                        $project: {
                            title: 1,
                            description: 1,
                            "author_details.name": 1,
                            "category_details.name": 1,
                            ISBN: 1,
                            price: 1,
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
        } catch (error: any) {
            return { status: false, content: error.message }
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
    async createBook(bookdata: IBook): Promise<IResponseType> {
        try {
            const responsedata = await Book.create({ title: bookdata.title, author: bookdata.author, category: bookdata.category, ISBN: bookdata.ISBN, description: bookdata.description, price: bookdata.price })

            if (responsedata) {
                return { status: true, content: successMessage.SucessfullyBookCreated }
            } else {
                throw new Error(errorMessage.ErrorInCreatingBook)
            }
        } catch (error: any) {
            return { status: false, content: error.message }
        }
    }
    async getBookById(id: string): Promise<IResponseType> {
        try {
            const responsedata = await Book.findById(id)
            if (responsedata) {
                return { status: true, content: responsedata }
            } else {
                throw new Error(FatalErrorMessage.BookNotFound)
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async updateBook(bookid: string, title: string, author: ObjectId, category: ObjectId, ISBN: number, description: string, price: number): Promise<IResponseType> {
        try {
            const responsedata = await Book.findByIdAndUpdate(bookid, { title: title, author: author, category: category, ISBN: ISBN, description: description, price: price })
            if (responsedata) {
                return { status: true, content: successMessage.SuccessfullyBookUpdated }
            } else {
                throw new Error(FatalErrorMessage.BookNotFound)
            }
        } catch (error: any) {
            return { status: false, content: error.message }
        }
    }
    async deleteBook(bookid: string): Promise<IResponseType> {
        try {
            const responsedata = await Book.findByIdAndDelete(bookid)
            if (responsedata) {
                return { status: true, content: successMessage.SuccessfullyBookDeleted }
            } else {
                throw new Error(FatalErrorMessage.BookNotFound)
            }
        } catch (error: any) {
            return { status: false, content: error.message }
        }
    }
}