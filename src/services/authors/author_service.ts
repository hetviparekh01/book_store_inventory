import {
     errorMessage,
     FatalErrorMessage,
     successMessage,
} from "@constants";
import { IAuthor, IResponseType } from "@interfaces";
import { searchQuery,paginationQuerySkip,paginationQueryLimit } from "@utils";
import { Author } from "@models";

export class AuthorService {
     async getAuthor(searchTerm: any): Promise<IResponseType> {
          try {
               let regex = { $regex: searchTerm.search, $options: "i" };

               let feildArray:any[][]=[]
               let and:object[]=[]
               let or:object[]=[]
               
               if(searchTerm.search){
                    or.push({'name':regex})
                    
               }
               if(searchTerm.filter_nationality){
                   and.push({"nationality":searchTerm.filter_nationality})
                  
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
             
               let responsedata = await Author.aggregate([
                    dynamicquery,
                    {
                         $project: {
                              name: 1,
                              biography:1,
                              nationality: 1
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
     async createAuthor(authordata: IAuthor): Promise<IResponseType> {
          try {
               const responsedata = await Author.create({
                    name: authordata.name,
                    biography: authordata.biography,
                    nationality: authordata.nationality,
               });
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyAuthorCreated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.AuthorNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async getAuthorById(id: string) {
          try {
               const responsedata = await Author.findById(id);
               if (responsedata) {
                    return { status: true, content: responsedata };
               } else {
                    throw new Error(FatalErrorMessage.AuthorNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async updateAuthor(authorid: string, authordata: IAuthor) {
          try {
               const responsedata = await Author.findByIdAndUpdate(authorid, {
                    name: authordata.name,
                    biography: authordata.biography,
                    nationality: authordata.nationality,
               });
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyAuthorUpdated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.AuthorNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async deleteAuthor(authorid: string) {
          try {
               const responsedata = await Author.findByIdAndDelete(authorid);
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyAuthorDeleted,
                    };
               } else {
                    throw new Error(FatalErrorMessage.AuthorNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
