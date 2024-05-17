import { Request, Response } from "express";
import { CategoryService } from "@services";
import { ICategory } from "@interfaces";
import { errorMessage ,statuscode} from "@constants";

const category_service = new CategoryService();

export class CategoryController {
     async getCategories(req: Request, res: Response): Promise<Response> {
          try {
               const searchTerm: any = req.query;
               const responsedata =
                    await category_service.getCategories(searchTerm);
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json({
                              length: responsedata.length,
                              content: responsedata.content,
                         });
               } else {
                    return res
                         .status(statuscode.NotFound)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.ErrorInCreatingCategory,
                    });
          }
     }
     async createCategory(req: Request, res: Response): Promise<Response> {
          try {
               const name: string = req.body.name;
               const categorydata: object = { name };
               const responsedata = await category_service.createCategory(
                    categorydata as ICategory
               );
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json(responsedata.content);
               } else {
                    return res
                         .status(statuscode.NotFound)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.ErrorInGettingCategory,
                    });
          }
     }

     async getCategoryById(req: Request, res: Response): Promise<Response> {
          try {
               const id = req.params.id;
               const responsedata = await category_service.getCategoryById(id);
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json({
                              length: responsedata.length,
                              content: responsedata.content,
                         });
               } else {
                    return res
                         .status(statuscode.NotFound)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.ErrorInGettingCategory,
                    });
          }
     }
     async updateCategory(req: Request, res: Response): Promise<Response> {
          try {
               const id = req.params.id;
               const name: string = req.body.name;
               const categorydata: object = { name };
               const responsedata = await category_service.updateCategory(
                    id,
                    categorydata as ICategory
               );
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json(responsedata.content);
               } else {
                    return res
                         .status(statuscode.NotFound)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.ErrorInUpdatingCategory,
                    });
          }
     }
     async deleteCategory(req: Request, res: Response): Promise<Response> {
          try {
               const id: string = req.params.id;
               const responsedata = await category_service.deleteCategory(id);
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json(responsedata.content);
               } else {
                    return res
                         .status(statuscode.NotFound)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.ErrorInDeletingCategory,
                    });
          }
     }
}
