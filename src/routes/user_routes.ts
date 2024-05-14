import express, { Router } from 'express';
import { SignUpController } from '../controllers/admin/signup_controller';
import { LoginController } from '../controllers/admin/login_controller';
import  {UserController} from '../controllers/admin/user_controller';
import { LogOutController } from '../controllers/admin/logoutcontroller';
import { AuthMiddlewares } from '../middlewares';
import { RoleMiddleware } from '../middlewares';
import { ValidateMiddleware } from '../middlewares';
import { userSchemaValidate } from '../validations/validations';

const user_route:Router= express.Router();


const user_controller=new UserController()
const login_controller=new LoginController()
const logout_controller=new LogOutController()
const signup_controller=new SignUpController()
const middleware=new AuthMiddlewares()
const rolemiddleware=new RoleMiddleware()
const uservalidatemiddleware=new ValidateMiddleware(userSchemaValidate)





user_route.post('/signup',uservalidatemiddleware.validator, signup_controller.signUp);
user_route.post('/login',uservalidatemiddleware.validator,login_controller.login);
user_route.get('/getusers',middleware.jwtAuthUser,rolemiddleware.jwtAuthRole,user_controller.getUsers);
user_route.post('/logout',middleware.jwtAuthUser,logout_controller.logout);
user_route.get('/getuserbyid/:id', middleware.jwtAuthUser,rolemiddleware.jwtAuthRole,user_controller.getUserById);
user_route.put('/updateuser/:id', middleware.jwtAuthUser,rolemiddleware.jwtAuthRole, user_controller.updateUser);
user_route.delete('/deleteuser/:id', middleware.jwtAuthUser,rolemiddleware.jwtAuthRole, user_controller.deleteUser);



export default user_route;