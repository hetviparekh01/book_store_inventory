import express, { Router } from "express";
import { CategoryController } from "@controllers";
import { RoleMiddleware, ValidateMiddleware } from "@middlewares";
import { categorySchemaValidate } from "../validations/validations";

const category_route: Router = express.Router();
const category_controller = new CategoryController();
const rolemiddleware = new RoleMiddleware();
const validationmiddleware = new ValidateMiddleware(categorySchemaValidate);

category_route.get(
     "/getcategories", 
     category_controller.getCategories
);
category_route.post(
     "/addcategory",
     rolemiddleware.jwtAuthRole,
     validationmiddleware.validator,
     category_controller.createCategory
);
category_route.get(
     "/getcategorybyid/:id",
     category_controller.getCategoryById
);
category_route.put(
     "/updatecategory/:id",
     rolemiddleware.jwtAuthRole,
     category_controller.updateCategory
);
category_route.delete(
     "/deletecategory/:id",
     rolemiddleware.jwtAuthRole,
     category_controller.deleteCategory
);

export default category_route;
