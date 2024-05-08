import * as Yup from "yup";

export const userSchemaValidate= Yup.object({
    name:Yup.string().required("name is required"),
    password:Yup.string().required("password is required"),
    role:Yup.string().required("role is required")
})