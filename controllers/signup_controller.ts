import { SignUpService } from "../services/user/signup_service";
import { Request, Response } from "express"
import { PasswordHashing } from "../utils/bcryptpassword";

const signup_service = new SignUpService();
const password_hashing = new PasswordHashing()

export class SignUpController {

    async signUp(req: Request, res: Response): Promise<Response> {
        try {
            const name = req.body.name;
            const passwordwithouthasded = req.body.password

            const passwordwithhased = await password_hashing.passwordEncrypt(passwordwithouthasded)

            const role = req.body.role

            await signup_service.signup(name, passwordwithhased, role)

            return res.status(200).json({ message: "user created successfully!!" })
        } catch (error: any) {

            return res.status(500).json({ message: error.message })
        }

    }
}