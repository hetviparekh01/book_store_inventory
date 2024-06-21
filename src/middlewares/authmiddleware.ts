import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";
import { errorMessage ,statuscode} from "@constants";
const secretKey: String = config.get("secret-key") || "HETVIPAREKH";

export interface Tokens {
     id: string;
     role: string;
}
declare module 'express-serve-static-core'{
     interface Request {
         user:Tokens
     }
 }
export class AuthMiddlewares {
     jwtAuthUser(req: Request, res: Response, next: NextFunction) {
          const token: string | undefined = req.headers.authorization?.split(' ')[1];
          // console.log(token);
          if (!token) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.UserIsNotLoggedIn,
                    });
          }
          try {
               const decoded: any = jwt.verify(token, secretKey as string);
               req.user = decoded;
               next();
          } catch (error: any) {
               return res
                    .status(statuscode.error)
                    .json({ status: false, content: error.message });
          }
     }

     generateAccessToken(userData: Tokens) {
          return jwt.sign(userData, secretKey as string, { expiresIn: "24h" });
     }
     generateRefreshToken(userdata: Tokens) {
          const id = userdata.id;
          return jwt.sign({ id }, secretKey as string, { expiresIn: "7d" });
     }
}
