import express, { Request, Response } from "express";
import user_route from "./user_routes";
import author_route from "./author_routes";
import category_route from "./category_routes";
import book_route from "./book_route";
import { AuthMiddlewares } from "@middlewares";

const middleware = new AuthMiddlewares();
const route = express.Router();

route.use("/user", user_route);
route.use("/book", middleware.jwtAuthUser, book_route);
route.use("/author", middleware.jwtAuthUser, author_route);
route.use("/category", middleware.jwtAuthUser, category_route);

export default route;
