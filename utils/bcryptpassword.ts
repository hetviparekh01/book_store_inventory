import bcrypt from 'bcrypt'

export class PasswordHashing {
    async passwordEncrypt(password:string){
        const hashedPassword :string= await bcrypt.hash(password,10)
        return hashedPassword
    }
    async isPasswordValidate(upassword:string,dbpassword:string){
         return await bcrypt.compare(upassword,dbpassword) 
    }
}