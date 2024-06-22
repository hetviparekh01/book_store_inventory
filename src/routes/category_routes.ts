import express, { Router } from "express";
import { CategoryController } from "@controllers";
import {  ValidateMiddleware, roleVerify } from "@middlewares";
import { categorySchemaValidate } from "../validations/validations";

const category_route: Router = express.Router();
const category_controller = new CategoryController();
const validationmiddleware = new ValidateMiddleware(categorySchemaValidate);

category_route.get(
     "/filtercategories", 
     category_controller.getCategoriesByFilteration
);
category_route.post(
     "/addcategory",
     roleVerify(['admin']),
     validationmiddleware.validator,
     category_controller.createCategory
);
category_route.get(
     "/getcategories",
     category_controller.getCategories
);
category_route.put(
     "/updatecategory/:id",
     roleVerify(['admin']),
     category_controller.updateCategory
);
category_route.delete(
     "/deletecategory/:id",
     roleVerify(['admin']),
     category_controller.deleteCategory
);

export default category_route;
