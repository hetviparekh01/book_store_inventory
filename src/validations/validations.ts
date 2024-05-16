import * as Yup from "yup";

export const userSchemaValidate = Yup.object({
     name: Yup.string().required("name is required"),
     password: Yup.string().required("password is required"),
     role: Yup.string().required("role is required"),
});
export const bookSchemaValidate = Yup.object({
     title: Yup.string().required("title is required"),
     author: Yup.string().required("author is required"),
     category: Yup.string().required("category is required"),
     ISBN: Yup.number().required("ISBN is required"),
     description: Yup.string().required("description is required"),
     price: Yup.string().required("price is required"),
});
export const authorSchemaValidate = Yup.object({
     name: Yup.string().required("name is required"),
     biography: Yup.string().required("biography is required"),
     nationality: Yup.string().required("nationality is required"),
});
export const categorySchemaValidate = Yup.object({
     name: Yup.string().required("name is required"),
});
export const userUpdateSchemaValidate = Yup.object({
     name: Yup.string(),
     password: Yup.string().required("password is required"),
     role: Yup.string().required("role is required"),
});
