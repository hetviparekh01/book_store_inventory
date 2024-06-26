import { Request, Response } from "express";
import { AuthorService } from "@services";
import { IAuthor } from "@interfaces";
import { errorMessage ,statuscode} from "@constants";


const author_service = new AuthorService();

export class AuthorController {
     async getAuthorByFilteration(req: Request, res: Response): Promise<Response> {
          try {
               const searchTerm: any = req.query;
               const responsedata = await author_service.getAuthorByFilteration(searchTerm);

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
                         content: errorMessage.ErrorInGettingAuthor,
                    });
          }
     }
     async createAuthor(req: Request, res: Response): Promise<Response> {
          try {
               // const {name ,biography,nationality}=req.body
               const name: string = req.body.name;
               const biography: string = req.body.biography;
               const nationality: string = req.body.nationality;
               const authordata: object = { name, biography, nationality };
               const responsedata = await author_service.createAuthor(
                    authordata as IAuthor
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
                         content: errorMessage.ErrorInCreatingAuthor,
                    });
          }
     }

     async getAuthors(req: Request, res: Response) {
          try {
               const id = req.params.id;
               const responsedata = await author_service.getAuthors(id);

               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json({content:responsedata.content,length:responsedata.length});
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
                         content: errorMessage.ErrorInGettingAuthor,
                    });
          }
     }
     
     async getAuthorByName(req: Request, res: Response) {
          try {
               const name= req.query.name;
               const responsedata = await author_service.getAuthorByName(name as string);

               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json({content:responsedata.content});
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
                         content: errorMessage.ErrorInGettingAuthor,
                    });
          }
     }


     async updateAuthor(req: Request, res: Response): Promise<Response> {
          try {
               const id = req.params.id;
               const name: string = req.body.name;
               const biography: string = req.body.biography;
               const nationality: string = req.body.nationality;
               const authordata = { name, biography, nationality };
               const responsedata = await author_service.updateAuthor(
                    id,
                    authordata as IAuthor
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
                         content: errorMessage.ErrorInUpdatingAuthor,
                    });
          }
     }
     async deleteAuthor(req: Request, res: Response): Promise<Response> {
          try {
               const id: string = req.params.id;
               const responsedata = await author_service.deleteAuthor(id);
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
                         content: errorMessage.ErrorInDeletingAuthor,
                    });
          }
     }
}
