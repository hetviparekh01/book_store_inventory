import { FatalErrorMessage, successMessage } from "@constants";
import { ICategory ,IResponseType } from "@interfaces";
import { Category } from "@models";
import { searchQuery,paginationQuerySkip,paginationQueryLimit } from "@utils";
export class CategoryService {
     // async getCategories(searchTerm: any): Promise<IResponseType> {
     //      try {
     //           const limitsize = searchTerm.limit || 5;
     //           const page = searchTerm.page || 1;
     //           const skip = (page - 1) * limitsize;
     //           let responsedata: any;
     //           let matchObject: any = {};
     //           let regex = { $regex: searchTerm.search, $options: "i" };
     //           if (searchTerm.search) {
     //                matchObject["name"] = regex;
     //           }
     //           if (Object.entries(searchTerm).length === 0) {
     //                responsedata = await Category.find({});
     //           } else {
     //                // let regex={$regex:searchTerm.search,$options:'i'}
     //                responsedata = await Category.aggregate([
     //                     {
     //                          $match: matchObject,
     //                     },
     //                     {
     //                          $project: {
     //                               name: 1,
     //                               biography: 1,
     //                               nationality: 1,
     //                          },
     //                     },
     //                     {
     //                          $skip: Number(skip),
     //                     },
     //                     {
     //                          $limit: Number(limitsize),
     //                     },
     //                ]);
     //           }
     //           if (responsedata) {
     //                return {
     //                     status: true,
     //                     content: responsedata,
     //                     length: responsedata.length,
     //                };
     //           } else {
     //                throw new Error(FatalErrorMessage.DataNotFound);
     //           }
     //      } catch (error: any) {
     //           return { status: false, content: error.message };
     //      }
     // }
     async getCategoriesByFilteration(searchTerm: any): Promise<IResponseType> {
          try {
               let regex = { $regex: searchTerm.search, $options: "i" };

               let feildArray:any[][]=[]
               let and:object[]=[]
               let or:object[]=[]
               
               if(searchTerm.search){
                    or.push({'name':regex})
                    
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
                    
                    let responsedata = await Category.aggregate([
                    dynamicquery,
                    {
                         $project: {
                              name: 1,
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
     async createCategory(categorydata: ICategory): Promise<IResponseType> {
          try {
               const responsedata = await Category.create({
                    name: categorydata.name,
               });
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyCategoryCreated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.CategoryNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async getCategories(): Promise<IResponseType> {
          try {
               const responsedata = await Category.find({});
               if (responsedata) {
                    return { status: true, content: responsedata };
               } else {
                    throw new Error(FatalErrorMessage.CategoryNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async updateCategory(
          categoryid: string,
          categorydata: ICategory
     ): Promise<IResponseType> {
          try {
               const responsedata = await Category.findByIdAndUpdate(
                    categoryid,
                    { name: categorydata.name }
               );
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyCategoryUpdated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.CategoryNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async deleteCategory(categoryid: string): Promise<IResponseType> {
          try {
               const responsedata =
                    await Category.findByIdAndDelete(categoryid);
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyCategoryDeleted,
                    };
               } else {
                    throw new Error(FatalErrorMessage.CategoryNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
