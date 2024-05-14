import { errorMessage, successMessage } from '../../constants/message'
import { IResponseType } from '../../interfaces/IResponseType'
import {User} from '../../models'


export class LogOutService {
    async logoutuser(userid:string):Promise<IResponseType>{
        try {
            const responsedata=await User.findByIdAndUpdate(userid, 
                {
                    $unset: 
                    {
                        refreshToken: 1
                    }
                } 
            )
            if(responsedata){
                return {status:true,content:successMessage.SuccessfullyLoggedOut}
            }else{
                throw new Error(errorMessage.ErrorInUserLoggedOut)
            }
        } catch (error:any) {
            return {status:false,content:error.message}
        }
       
    }
}


