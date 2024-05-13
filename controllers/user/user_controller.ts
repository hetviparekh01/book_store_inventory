import { Request, Response, NextFunction} from 'express';
import { UserService } from '../../services/user/userservice';
import { successMessage, errorMessage, FatalErrorMessage } from '../../constants/message'
import { statuscode } from '../../constants/statuscode';


const userservice = new UserService()


export class UserController {

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const responsedata = await userservice.getUsers()

      if(responsedata.status){
        return res
        .status(statuscode.success)
        .json(responsedata)
      }
      else{
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content)
      }
     
    }
    catch (error: any) {
      return res
      .status(statuscode.error)
      .json({status:false,content:errorMessage.ErrorInGettingUser})
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const responsedata = await userservice.getUserById(id);

      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json(responsedata);
      }
      else {
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content)
      }

    }
    catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content:errorMessage.ErrorInGettingUser});
    }
  }



  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const { name, password, role } = req.body;
      // const obj:object={name,password,role}

      const responsedata = await userservice.updateUser(id, name,password,role);

      if (responsedata.status) {
        return res
        .status(statuscode.success)
        .json(responsedata.content);
      }
      return res
      .status(statuscode.NotFound)
      .json(responsedata.content);
      
    }
    catch (error: any) {
      return res
      .status(statuscode.error)
      .json({ status:false, message: errorMessage.ErrorInUpdatingUser });
    }
  }


  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      const responsedata = await userservice.deleteUser(id);

      if (responsedata.status) {
        return res
        .status(statuscode.success)
        .json(responsedata.content);
      }
      else {
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content);
      }
    } catch (error: any) {
      return res
      .status(statuscode.error)
      .json({ status:false, message: errorMessage.ErrorInDeletingUser });
    }
  }
}












