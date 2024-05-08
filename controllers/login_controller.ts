import {Request,Response} from 'express'
import { LoginService } from '../services/user/login_service'

const loginservice=new LoginService()

export class LoginController{
    async login(req:Request,res:Response):Promise<void>{
        try {
            const username: string = req.body.name;
            const passwordwithouthasded: string = req.body.password;
            console.log(username);
            const responseData=await loginservice.login(username,passwordwithouthasded)
            res.status(200).json(responseData)
        } catch (error:any) {
            res.status(500).json({error:error.message})
        }
    }
}
