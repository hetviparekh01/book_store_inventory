import { Request, Response } from "express";
import { LoginService } from "@services";
import { statuscode } from "../../constants/statuscode";
import { FatalErrorMessage, errorMessage } from "../../constants/message";
import { IUser } from "@interfaces";
const loginservice = new LoginService();

export class LoginController {
     async login(req: Request, res: Response): Promise<Response> {
          try {
               // const name: string = req.body.name;
               // const passwordwithouthasded: string = req.body.password;
               // const role=req.body.role;

               const { name, password, role } = req.body;

               // const userdata:object={name,passwordwithouthasded,role}
               const responsedata = await loginservice.login({
                    name,
                    password,
                    role,
               } as IUser);
               if (responsedata.status) {
                    return res.status(statuscode.success).json(responsedata);
               } else if (
                    responsedata.content ===
                    FatalErrorMessage.InvalidCredentials
               ) {
                    return res
                         .status(statuscode.unauthorized)
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
                         content: errorMessage.ErrorInUserLoggedIn,
                    });
          }
     }
}
