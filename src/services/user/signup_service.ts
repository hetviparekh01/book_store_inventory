import { User } from "@models";
import { IResponseType,IUser } from "@interfaces";
import { FatalErrorMessage, errorMessage, successMessage } from "@constants";
import { Error } from "mongoose";

export class SignUpService {
     async signup(userdata: IUser): Promise<IResponseType> {
         
          try {
               const user=await User.findOne({name:userdata.name})
               if(user){
                    throw new Error(FatalErrorMessage.AlreadyExitsUser)
               }
               const responsedata = await User.create({
                    name: userdata.name,
                    password: userdata.password,
                    role: userdata.role,
               });
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SucessfullyUserCreated,
                    };
               } else {
                    throw new Error(errorMessage.ErrorInUserCreating);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
