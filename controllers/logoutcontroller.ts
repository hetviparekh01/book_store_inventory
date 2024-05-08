import {Request,Response} from 'express'
import { LogOutService } from '../services/user/logoutservice'
import { Request1,Tokens } from '../middlewares/authmiddleware'

const logoutservice=new LogOutService()

export class LogOutController{
 
    async logout(req:Request,res:Response){
        try {
        const userToken:Tokens=(req as Request1).user
        // console.log(userToken)
        
        const user=await logoutservice.logoutuser(userToken.id as string)
        if(!user){
            res.status(400).json({message:"user not found"})
        } 
        return res.status(200).json("Logged out sucessfully")
        } catch (error:any) {
            res.status(500).json({message:error.message})
        }         
    }
}