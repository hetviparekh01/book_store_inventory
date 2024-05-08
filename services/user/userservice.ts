
import User from '../../models/user_model';
import { IUser } from '../../interfaces/IUser'
// import Profile from '../../models/profile_model';
// import Cart from '../../models/cart_model'
import { successMessage, errorMessage } from '../../constants/message'
import { statuscode } from '../../constants/statuscode';

export class UserService {



  async getUsers(): Promise<IUser[] | object> {
    try {
      return await User.find();
    }
    catch (error) {
      return {statuscode:statuscode.error,message:errorMessage.Servererr};
    }

  }


  

  async getUserById(id: string): Promise<IUser | object | null> {
    try {
      return await User.findById(id);
    } 
    catch (error) {
      return {statuscode:statuscode.error,message:errorMessage.Servererr};
    }

  }

  async updateUser(id: string, name: string, password: string,role:string): Promise<IUser | null |object> {
    try {
      return await User.findByIdAndUpdate(id, { name, password ,role}, { new: true });

    } catch (error) {
      return {satuscode:statuscode.success,message:errorMessage.Servererr};
    }
  }


  async deleteUser(userid: string): Promise<IUser | null |object> {
   return await User.findByIdAndDelete(userid)
  }
}
