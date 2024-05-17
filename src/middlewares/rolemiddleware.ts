import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";
import { FatalErrorMessage, errorMessage,statuscode } from "@constants";
import { User } from "@models";
import { IUser } from "@interfaces";
const secretKey: String = config.get("secret-key") || "your-secret-key";

export class RoleMiddleware {
     async jwtAuthRole(req: Request, res: Response, next: NextFunction) {
          const token: string | undefined = req.headers.authorization;
          if (!token) {
               return res
                    .status(statuscode.unauthorized)
                    .json({
                         status: false,
                         content: errorMessage.UserIsNotLoggedIn,
                    });
          }
          try {
               const decoded: any = jwt.verify(token, secretKey as string);
               let uid = decoded.id;
               const user: IUser | null = await User.findById(uid);
               // console.log(user);
               if (!user) {
                    return res
                         .status(statuscode.error)
                         .json({
                              status: false,
                              content: FatalErrorMessage.UserNotFound,
                         });
               } else {
                    const role = user.role;
                    if (role === "admin") {
                         next();
                    } else {
                         return res
                              .status(statuscode.forbidden)
                              .json({
                                   status: false,
                                   content: FatalErrorMessage.UnauthorizedAction,
                              });
                    }
               }
          } catch (error: any) {
               return res
                    .status(statuscode.unauthorized)
                    .json({ status: false, content: error.message });
          }
     }
}
