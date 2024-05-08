import { IUser } from '../../interfaces/IUser'
import User from '../../models/user_model'

export class SignUpService{
    async signup(name:string,password:string,role:string):Promise<IUser>{
        return await User.create({name:name,password:password,role:role}) ;
    }
}