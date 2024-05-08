import express ,{Router} from 'express'

import {AuthorController} from '../controllers/author_controller'
import { RoleMiddleware } from '../middlewares/rolemiddleware'

const author_controller=new AuthorController()
const author_route:Router=express.Router()
const rolemiddleware=new RoleMiddleware()

author_route.get('/getauthors',author_controller.getAuthors)
author_route.post('/addauthors',rolemiddleware.jwtAuthRole,author_controller.createAuthor)
author_route.get('/getauthorbyid/:id',author_controller.getAuthorById)
author_route.put('/updateauthor/:id',rolemiddleware.jwtAuthRole,author_controller.updateAuthor)
author_route.delete('/deleteauthor/:id',rolemiddleware.jwtAuthRole,author_controller.deleteAuthor)

export default author_route