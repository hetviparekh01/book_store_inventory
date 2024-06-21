import { User } from "@models";
import { PasswordHashing } from "@utils";
import { AuthMiddlewares, Tokens } from "@middlewares";
import { IResponseType,IUser } from "@interfaces";
import { FatalErrorMessage, successMessage } from "@constants";

const middleware = new AuthMiddlewares();
const passwordhashing = new PasswordHashing();

export class LoginService {
     //login of the user
     async login(userdata: IUser): Promise<IResponseType> {
          try {
               const user = await User.findOne({ name: userdata.name });
               if (!user) {
                    throw new Error(FatalErrorMessage.UserNotFound);
               }
               const dbpassword = user.password;
               const isvalidate = await passwordhashing.isPasswordValidate(
                    userdata.password,
                    dbpassword
               );
               if (!isvalidate) {
                    throw new Error(FatalErrorMessage.InvalidCredentials);
               } else {
                    const payload: Tokens = {
                         id: user.id,
                         role: user.role,
                    };
                    const Accesstoken = middleware.generateAccessToken(payload);
                    const Refreshtoken =
                         middleware.generateRefreshToken(payload);
                    await User.findByIdAndUpdate(user.id, {
                         refreshToken: Refreshtoken,
                    });
                    const responsedata = {
                         message: successMessage.SuccessfullyUserLoggedIn,
                         Accesstoken: Accesstoken,
                         Refreshtoken: Refreshtoken,
                         role:user.role
                    };
                    return { status: true, content: responsedata };
               }
          } catch (error: any) {
               return { status: false, content: error.message };
          }
     }
}
