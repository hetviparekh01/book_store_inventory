import { Request, Response } from "express";
import { LogOutService } from "@services";
import {  Tokens } from "@middlewares";
import { errorMessage,statuscode } from "@constants";

const logoutservice = new LogOutService();

export class LogOutController {
     async logout(req: Request, res: Response): Promise<Response> {
          try {
               const userToken: Tokens = req.user;
               const responsedata = await logoutservice.logoutuser(
                    userToken.id as string
               );
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json(responsedata.content);
               } else {
                    return res
                         .status(statuscode.error)
                         .json(responsedata.content);
               }
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.InternalServerError,
                    });
          }
     }
}
