import User from '../../models/user_model'
import { IResponseType } from '../../interfaces/IResponseType';
import { errorMessage, successMessage } from '../../constants/message';
import { Error } from 'mongoose';

export class SignUpService{
    async signup(name:string,password:string,role:string):Promise<IResponseType>{
        try {
            const responsedata=await User.create({name:name,password:password,role:role});

            if(responsedata){
                return {status:true,content:successMessage.SucessfullyUserCreated}
            }
            else{
                throw new Error(errorMessage.ErrorInUserCreating)
            }
        } catch (error:any) {
           return {status:false , content:error.message} 
        }
       
    }
}