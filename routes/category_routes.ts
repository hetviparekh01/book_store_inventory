import express ,{Router} from 'express'

import {CategoryController} from '../controllers/category_controller'
import { RoleMiddleware } from '../middlewares/rolemiddleware'

const category_controller=new CategoryController()
const category_route:Router=express.Router()
const rolemiddleware=new RoleMiddleware()

category_route.get('/getcategories',category_controller.getCategories)
category_route.post('/addcategory',rolemiddleware.jwtAuthRole,category_controller.createCategory)
category_route.get('/getcategorybyid/:id',category_controller.getCategoryById)
category_route.put('/updatecategory/:id',rolemiddleware.jwtAuthRole,category_controller.updateCategory)
category_route.delete('/deletecategory/:id',rolemiddleware.jwtAuthRole,category_controller.deleteCategory)

export default category_route