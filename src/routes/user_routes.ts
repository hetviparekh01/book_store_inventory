import express, { Router } from "express";
import {
     SignUpController,
     LoginController,
     UserController,
     LogOutController,
} from "@controllers";
import {
     AuthMiddlewares,
     ValidateMiddleware,
     roleVerify,
} from "@middlewares";
import { userSchemaValidate } from "../validations/validations";

const user_route: Router = express.Router();

const user_controller = new UserController();
const login_controller = new LoginController();
const logout_controller = new LogOutController();
const signup_controller = new SignUpController();
const middleware = new AuthMiddlewares();
const uservalidatemiddleware = new ValidateMiddleware(userSchemaValidate);

user_route.post(
     "/signup",
     uservalidatemiddleware.validator,
     signup_controller.signUp
);
user_route.post(
     "/login",
     login_controller.login
);
user_route.get(
     "/getusers",
     middleware.jwtAuthUser,
     roleVerify(['admin']),
     user_controller.getUsers
);
user_route.post(
     "/logout",
     middleware.jwtAuthUser, 
     logout_controller.logout
);
user_route.get(
     "/getuserbyid",
     middleware.jwtAuthUser,
     user_controller.getUserById
);
user_route.put(
     "/updateuser/:id",
     middleware.jwtAuthUser,
     user_controller.updateUser
);
user_route.delete(
     "/deleteuser/:id",
     middleware.jwtAuthUser,
     roleVerify(['admin']),
     user_controller.deleteUser
);

export default user_route;
