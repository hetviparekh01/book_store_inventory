import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const secretKey: String = "your-secret-key";


export interface Tokens {
    id: string;
    name: string
}

export interface Request1 extends Request {
    user: Tokens;
    profile: Tokens;
}

export class AuthMiddlewares {
    jwtAuthUser(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ error: "User is not logged in" });
        }
        try {
            // console.log(token);
            const decoded: any = jwt.verify(token, secretKey as string);

            // console.log(decoded);
            // const userId = decoded
            (req as Request1).user = decoded;


            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Invalid token" });
        }
    }
   
    generateAccessToken(userData: Tokens) {
        return jwt.sign(userData, secretKey as string, { expiresIn: '24h' });
    }
    generateRefreshToken(userdata: Tokens) {
        const id = userdata.id
        return jwt.sign({id}, secretKey as string, { expiresIn: '7d' });
    }
}



