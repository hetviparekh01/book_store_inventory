import {Request,Response} from 'express'
import { LogOutService } from '../../services'
import { Request1,Tokens } from '../../middlewares/authmiddleware'
import { statuscode } from '../../constants/statuscode'
import { errorMessage } from '../../constants/message'

const logoutservice=new LogOutService()

export class LogOutController{
    async logout(req:Request,res:Response):Promise<Response>{
        try {
        const userToken:Tokens=(req as Request1).user
        const responsedata=await logoutservice.logoutuser(userToken.id as string)
        if(responsedata.status){
            return res
            .status(statuscode.success).
            json(responsedata.content)
        }else{
            return res
            .status(statuscode.error)
            .json(responsedata.content)
        }
        } catch (error:any) {
            return res
            .status(statuscode.error)
            .json({status:false,content:errorMessage.InternalServerError})
        }         
    }
}