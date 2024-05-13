import { SignUpService } from "../../services/user/signup_service";
import { Request, Response, response } from "express"
import { PasswordHashing } from "../../utils/bcryptpassword";
import { statuscode } from "../../constants/statuscode";
import { errorMessage } from "../../constants/message";
import { IUser } from "../../interfaces/IUser";

const signup_service = new SignUpService();
const password_hashing = new PasswordHashing()

export class SignUpController {

    async signUp(req: Request, res: Response): Promise<Response> {
        try {
            const name = req.body.name;
            const passwordwithouthasded = req.body.password
            const passwordwithhased = await password_hashing.passwordEncrypt(passwordwithouthasded)
            const role = req.body.role
            const userdata:object={name,passwordwithhased,role}
           const responsedata= await signup_service.signup(userdata as IUser)

           if(responsedata.status){
                return res
                .status(statuscode.success)
                .json(responsedata.content)
           }else{
               return res
               .status(statuscode.error)
               .json(responsedata.content)
           }
        } catch (error: any) {
            return res
            .status(statuscode.error)
            .json({status:false,content:errorMessage.InternalServerError})
        }
    }
}