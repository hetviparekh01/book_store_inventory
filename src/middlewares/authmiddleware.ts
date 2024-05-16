import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { statuscode } from "../constants/statuscode";
import { errorMessage } from "../constants/message";
const secretKey: String = process.env.SECRET_KEY || "your-secret-key";

export interface Tokens {
     id: string;
     name: string;
}

export interface Request1 extends Request {
     user: Tokens;
}

export class AuthMiddlewares {
     jwtAuthUser(req: Request, res: Response, next: NextFunction) {
          const token: string | undefined = req.headers.authorization;

          if (!token) {
               return res
                    .status(statuscode.error)
                    .json({
                         status: false,
                         content: errorMessage.UserIsNotLoggedIn,
                    });
          }
          try {
               // console.log(token);
               const decoded: any = jwt.verify(token, secretKey as string);
               (req as Request1).user = decoded;
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
