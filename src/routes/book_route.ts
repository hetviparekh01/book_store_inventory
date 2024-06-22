import express, { Router } from "express";
import { BookController } from "@controllers";
import {  ValidateMiddleware, roleVerify } from "@middlewares";
import { bookSchemaValidate } from "../validations/validations";

const book_route: Router = express.Router();
const book_controller = new BookController();
const validationmiddleware = new ValidateMiddleware(bookSchemaValidate);

book_route.get(
     "/filterbooks", 
     book_controller.getBooksByFilteration
);
book_route.post(
     "/addbook",
     roleVerify(['admin','author']),
     validationmiddleware.validator,
     book_controller.createBook
);
book_route.get(
     "/getbooks",
      book_controller.getBook
);
book_route.put(
     "/updatebook/:id",
     roleVerify(['admin','author']),
     book_controller.updateBook
);
book_route.delete(
     "/deletebook/:id",
     roleVerify(['admin','author']),
     book_controller.deleteBook
);
book_route.get(
     "/getbookbyid/:id",
      book_controller.getBookById
);

export default book_route;
