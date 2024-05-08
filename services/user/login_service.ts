import User from '../../models/user_model';
import { IUser } from '../../interfaces/IUser'
import { Request, Response } from 'express'
import { PasswordHashing } from '../../utils/bcryptpassword';
import { AuthMiddlewares, Tokens } from '../../middlewares/authmiddleware';
import { ObjectId } from 'mongoose';

const middleware=new AuthMiddlewares()
const passwordhashing = new PasswordHashing()

export class LoginService {

    //login of the user
    async login(username:string,password:string) {
        try {
            const user = await User.findOne<IUser>({ name: username });
            if (!user) {
                return {400 :'user not found'}
            }
            const dbpassword = user.password;
            const isvalidate=await passwordhashing.isPasswordValidate(password, dbpassword)
            if (!isvalidate) {

                return {401 :'Incorrect Password'}

            } else {
                const payload:Tokens = {
                    id: user.id,
                    name: username,
                };

                const Accesstoken = middleware.generateAccessToken(payload);
                const Refreshtoken=middleware.generateRefreshToken(payload)

                await User.findByIdAndUpdate(user.id,{refreshToken:Refreshtoken})
                const responseData = {
                    messgae: "user is sucessfully logged in",
                    Accesstoken: Accesstoken,
                    Refreshtoken:Refreshtoken,
                };
                return {200:responseData}
            }
        } catch (error: any) {
            return { message: error.message };
        }
    }

}