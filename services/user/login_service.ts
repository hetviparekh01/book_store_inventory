import User from '../../models/user_model';
import { PasswordHashing } from '../../utils/bcryptpassword';
import { AuthMiddlewares, Tokens } from '../../middlewares/authmiddleware';
import { IResponseType } from '../../interfaces/IResponseType';
import { FatalErrorMessage, successMessage } from '../../constants/message';

const middleware=new AuthMiddlewares()
const passwordhashing = new PasswordHashing()

export class LoginService{

    //login of the user
    async login(username:string,password:string):Promise<IResponseType>{
        try {
            const user = await User.findOne({ name: username });
            if (!user) {
                throw new Error(FatalErrorMessage.UserNotFound)
            }
            const dbpassword = user.password;
            const isvalidate=await passwordhashing.isPasswordValidate(password, dbpassword)
            if (!isvalidate) {
                throw new Error(FatalErrorMessage.InvalidCredentials)
            } 
            else {
                const payload:Tokens = {
                    id: user.id,
                    name: username,
                };
                const Accesstoken = middleware.generateAccessToken(payload);
                const Refreshtoken=middleware.generateRefreshToken(payload);
                await User.findByIdAndUpdate(user.id,{refreshToken:Refreshtoken})
                const responsedata = {
                    messgae: successMessage.SuccessfullyUserLoggedIn,
                    Accesstoken: Accesstoken,
                    Refreshtoken:Refreshtoken,
                };
                return {status:true,content:responsedata}
            }
        } catch (error: any) {
            return {status:false,content: error.message };
        }
    }

}