import {Request,Response} from 'express'
import { LoginService } from '../../services/user/login_service'
import { statuscode } from '../../constants/statuscode';
import { FatalErrorMessage, errorMessage } from '../../constants/message';

const loginservice=new LoginService()

export class LoginController{
    async login(req:Request,res:Response):Promise<Response>{
        try {
            const username: string = req.body.name;
            const passwordwithouthasded: string = req.body.password;
            const responsedata=await loginservice.login(username,passwordwithouthasded)
            if(responsedata.status){
                return res
                .status(statuscode.success)
                .json(responsedata)
            }else if(responsedata.content===FatalErrorMessage.InvalidCredentials){
                return res
                .status(statuscode.unauthorized)
                .json(responsedata.content)
            }else{
                return res
                .status(statuscode.NotFound)
                .json(responsedata.content)
            }
            
        } catch (error:any) {
            return res
            .status(statuscode.error)
            .json({status:false,content:errorMessage.ErrorInUserLoggedIn})
        }
    }
}