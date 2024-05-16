import { User } from "@models";
import {
     successMessage,
     errorMessage,
     FatalErrorMessage,
} from "../../constants/message";
import { IResponseType } from "@interfaces";
import { IUser } from "@interfaces";

export class UserService {
     async getUsers(): Promise<IResponseType> {
          try {
               const responsedata = await User.find();
               if (responsedata.length === 0) {
                    throw new Error(errorMessage.ErrorInGettingUser);
               } else {
                    return { status: true, content: responsedata };
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async getUserById(id: string): Promise<IResponseType> {
          try {
               const responsedata = await User.findById(id);

               if (responsedata) {
                    return { status: true, content: responsedata };
               } else {
                    throw new Error(FatalErrorMessage.UserNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async updateUser(userid: string, userdata: IUser): Promise<IResponseType> {
          try {
               const responsedata = await User.findByIdAndUpdate(
                    userid,
                    {
                         name: userdata.name,
                         password: userdata.password,
                         role: userdata.role,
                    },
                    { new: true }
               );
               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyUserUpdated,
                    };
               } else {
                    throw new Error(FatalErrorMessage.UserNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
     async deleteUser(userid: string): Promise<IResponseType> {
          try {
               const responsedata = await User.findByIdAndDelete(userid);

               if (responsedata) {
                    return {
                         status: true,
                         content: successMessage.SuccessfullyUserDeleted,
                    };
               } else {
                    throw new Error(FatalErrorMessage.UserNotFound);
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
