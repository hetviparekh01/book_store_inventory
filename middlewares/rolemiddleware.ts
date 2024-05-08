import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const secretKey: String = "your-secret-key";
import User from '../models/user_model'
import { IUser } from '../interfaces/IUser';

export interface Tokens {
    id: string;
    name: string
}

export interface Request1 extends Request {
    user: Tokens;
    profile: Tokens;
}

export class RoleMiddleware{
    async jwtAuthRole(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "User is not logged in" });
        }
        try {
            // console.log(token);
            const decoded: any = jwt.verify(token, secretKey as string);

            let uid=decoded.id;
            // console.log(uid);
            
            const user:IUser |null = await User.findById(uid)
            // console.log(user);
            if(!user){
                next('user not found')
            }
            else{
                const role=user.role
                if(role==='admin'){
                    next();
                }else{
                    return res.status(403).json({ error: "Unauthorized action" });
                }      
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Invalid token" });
        }
    }
}



