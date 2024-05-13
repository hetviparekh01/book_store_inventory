
import { Request, Response } from 'express'
import { BookService } from '../../services/books/book_service'
import { ObjectId } from 'mongoose'
import { statuscode } from '../../constants/statuscode'
import { errorMessage } from '../../constants/message'
import { IBook } from '../../interfaces/IBook'


const book_service = new BookService()

export class BookController {
  async getBooks(req: Request, res: Response): Promise<Response> {
    try {
      const searchTerm: any = req.query
      // const {search,} = req.query
      //let obj = {search}
      const responsedata = await book_service.getBooks(searchTerm)
      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json({
            length: responsedata.length,
            content: responsedata.content
          })
      }
      else {
        return res
          .status(statuscode.NotFound)
          .json(responsedata.content)
      }
    } catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content: errorMessage.ErrorInGettingBook })
    }
  }
  async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const title: string = req.body.title
      const author: ObjectId = req.body.author
      const category: ObjectId = req.body.category
      const ISBN: number = req.body.ISBN
      const description: string = req.body.description
      const price: number = req.body.price
      const bookdata: object = { title, author, category, ISBN, description, price }
      const responsedata = await book_service.createBook(bookdata as IBook)
      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json(responsedata.content)
      } else {
        return res
          .status(statuscode.error)
          .json(responsedata.content)
      }
    } catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content: errorMessage.InternalServerError })
    }
  }
  async getBookById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const responsedata = await book_service.getBookById(id)
      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json(responsedata.content)
      } else {
        return res
          .status(statuscode.error)
          .json(responsedata.content)
      }
    } catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content: errorMessage.ErrorInGettingBook })
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const title: string = req.body.title
      const author: ObjectId = req.body.author
      const category: ObjectId = req.body.category
      const ISBN: number = req.body.ISBN
      const description: string = req.body.description
      const price: number = req.body.price
      const responsedata = await book_service.updateBook(id, title, author, category, ISBN, description, price)
      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json(responsedata.content)
      } else {
        return res
          .status(statuscode.NotFound)
          .json(responsedata.content);
      }
    } catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content: errorMessage.ErrorInUpdatingBook })
    }
  }
  async deleteBook(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const responsedata = await book_service.deleteBook(id)
      if (responsedata.status) {
        return res
          .status(statuscode.success)
          .json(responsedata.content)
      } else {
        return res
          .status(statuscode.NotFound)
          .json(responsedata.content);
      }
    } catch (error: any) {
      return res
        .status(statuscode.error)
        .json({ status: false, content: errorMessage.ErrorInDeletingBook })
    }
  }
}
