import { SignUpService } from "@services";
import { Request, Response, response } from "express";
import { PasswordHashing } from "@utils";
import { errorMessage,statuscode } from "@constants";
import { IUser } from "@interfaces";

const signup_service = new SignUpService();
const password_hashing = new PasswordHashing();

export class SignUpController {
     async signUp(req: Request, res: Response): Promise<Response> {
          try {
               const name = req.body.name;
               const passwordwithouthasded = req.body.password;
               const password = await password_hashing.passwordEncrypt(
                    passwordwithouthasded
               );
               const role = req.body.role;
               const userdata: object = { name, password, role };
               const responsedata = await signup_service.signup(
                    userdata as IUser
               );
               if (responsedata.status) {
                    return res
                         .status(statuscode.success)
                         .json(responsedata.content);
               } else {
                    return res
                         .status(statuscode.alreadyexits)
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
