import User from '../../models/user_model'
import { IResponseType } from '../../interfaces/IResponseType';
import { errorMessage, successMessage } from '../../constants/message';
import { Error } from 'mongoose';
import { IUser } from '../../interfaces/IUser';

export class SignUpService{
    async signup(userdata:IUser):Promise<IResponseType>{
        try {
            const responsedata=await User.create({name:userdata.name,password:userdata.password,role:userdata.role});

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