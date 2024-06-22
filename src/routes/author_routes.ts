import express, { Router } from "express";
import { AuthorController } from "@controllers";
import { ValidateMiddleware, roleVerify } from "@middlewares";
import { authorSchemaValidate } from "../validations/validations";

const author_route: Router = express.Router();
const author_controller = new AuthorController();
const validationmiddleware = new ValidateMiddleware(authorSchemaValidate);

author_route.get("/filterauthor", author_controller.getAuthorByFilteration);
author_route.post(
  "/addauthor",
  roleVerify(['admin','author']),
  validationmiddleware.validator,
  author_controller.createAuthor
);
author_route.get("/getauthors", author_controller.getAuthors);
author_route.get("/getauthorbyname",roleVerify(['admin','author']),author_controller.getAuthorByName);
author_route.put(
  "/updateauthor/:id",
  roleVerify(['admin','author']),
  author_controller.updateAuthor
);
author_route.delete(
  "/deleteauthor/:id",
  roleVerify(['admin','author']),
  author_controller.deleteAuthor
);

export default author_route;
