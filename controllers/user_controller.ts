import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user/userservice';
import { PasswordHashing } from '../utils/bcryptpassword';
import { Request1 } from '../middlewares/authmiddleware';
import { successMessage, errorMessage, FatalErrorMessage } from '../constants/message'
import { statuscode } from '../constants/statuscode';
import { IUser } from '../interfaces/IUser';

const userservice = new UserService()
const passwordhashing = new PasswordHashing()

export class UserController {

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users = await userservice.getUsers()
      return res.json(users);
    }
    catch (error: any) {
      return res.json({ statuscode: statuscode.error, message: errorMessage.GettingUser });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const user = await userservice.getUserById(id);
      if (!user) {
        return res.json({ statuscode: statuscode.unauthorized, message: FatalErrorMessage.UserErr });;
      }
      return res.status(200).json(user);
    } catch (error: any) {
      return res
      .status(statuscode.error)
      .json({ message: errorMessage.GettingUser, status: false });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const { name, password, role } = req.body;
      const updatedUser = await userservice.updateUser(id, name, password, role);
      if (!updatedUser) {
        return res.json({ statuscode: statuscode.unauthorized, message: FatalErrorMessage.UserErr });
      }
      return res.status(200).json({ mesage: "user updated sucessfully" });
    }
    catch (error: any) {
      return res.status(500).json({ statuscode: statuscode.error, message: errorMessage.UpdatingUser });
    }
  }


  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const response = await userservice.deleteUser(id);
      if (response) {
        return res.status(200).json({ mesage: "user deleted sucessfully" });
      }
      else {
        return res.status(200).json({ mesage: "error in user deletion" });
      }
    } catch (error: any) {
      return res.json({ statuscode: statuscode.error, message: errorMessage.DeletingUser });
    }
  }
}






