import User from '../../models/user_model'


export class LogOutService {
    async logoutuser(userid: string) {
     
        return await User.findByIdAndUpdate(userid, 
            {
                $unset: 
                {
                    refreshToken: 1
                }
            } 
        )
    }
}

