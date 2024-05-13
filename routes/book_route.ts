import express ,{Router} from 'express'

import {BookController} from '../controllers/book/book_controller'
import { RoleMiddleware } from '../middlewares/rolemiddleware'
import { bookSchemaValidate } from '../validations/validations'
import { ValidateMiddleware } from '../middlewares/validationmiddleware'

const book_route:Router=express.Router()
const book_controller=new BookController()
const rolemiddleware=new RoleMiddleware()
const validationmiddleware=new ValidateMiddleware(bookSchemaValidate)


book_route.get('/getbooks',book_controller.getBooks)
book_route.post('/addbook',rolemiddleware.jwtAuthRole,validationmiddleware.validator,book_controller.createBook)
book_route.get('/getbookbyid/:id',book_controller.getBookById)
book_route.put('/updatebook/:id',rolemiddleware.jwtAuthRole,validationmiddleware.validator,book_controller.updateBook)
book_route.delete('/deletebook/:id',rolemiddleware.jwtAuthRole,book_controller.deleteBook)

export default book_route
