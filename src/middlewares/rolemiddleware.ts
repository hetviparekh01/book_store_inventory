import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";
import { FatalErrorMessage, errorMessage,statuscode } from "@constants";
import { User } from "@models";
import { IUser } from "@interfaces";
const secretKey: String = config.get("secret-key") || "your-secret-key";

export const roleVerify=(roles:string[])=>{
     return(req:Request,res:Response,next:NextFunction)=>{
          try {
               const userrole=(req.user).role;
               if(!roles.includes(userrole)){
                    return res.status(403).json("unauthorized access")
               }
               next();
          } catch (error:any) {
               return {status:false,content:error.message}
          }
     }
}
