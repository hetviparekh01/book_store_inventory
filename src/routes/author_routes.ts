import express, { Router } from "express";
import { AuthorController } from "@controllers";
import { RoleMiddleware, ValidateMiddleware } from "@middlewares";
import { authorSchemaValidate } from "../validations/validations";

const author_route: Router = express.Router();
const author_controller = new AuthorController();
const rolemiddleware = new RoleMiddleware();
const validationmiddleware = new ValidateMiddleware(authorSchemaValidate);

author_route.get("/getauthors", author_controller.getAuthors);
author_route.post(
     "/addauthor",
     rolemiddleware.jwtAuthRole,
     validationmiddleware.validator,
     author_controller.createAuthor
);
author_route.get("/getauthorbyid/:id", author_controller.getAuthorById);
author_route.put(
     "/updateauthor/:id",
     rolemiddleware.jwtAuthRole,
     validationmiddleware.validator,
     author_controller.updateAuthor
);
author_route.delete(
     "/deleteauthor/:id",
     rolemiddleware.jwtAuthRole,
     author_controller.deleteAuthor
);

export default author_route;
