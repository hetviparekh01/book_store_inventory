
import {Request,Response} from 'express'
import { BookService } from '../services/books/book_service'
import { ObjectId } from 'mongoose'

const book_service=new BookService()

export class BookController{
  async getBooks(req :Request,res :Response ){
    try {
        const searchTerm:any=req.query
        // const {search,} = req.query
        //let obj = {search}
        const books=await book_service.getBooks(searchTerm)
        res.status(200).json({
          length:books.length,
          data:books,
        })
      } catch (error:any) {
          res.status(500).json({message:error.message})
      }
}
async createBook(req :Request ,res: Response){
    try {
      const title:string=req.body.title
      const author:ObjectId=req.body.author
      const category:ObjectId=req.body.category
      const ISBN:number=req.body.ISBN
      const description:string=req.body.description
      const price:number=req.body.price
      const book=await book_service.createBook(title,author,category,ISBN,description,price)
      res.status(200).json(book)
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

async getBookById(req :Request ,res: Response){
  try {
    const id=req.params.id;
    const book=await book_service.getBookById(id)
    if(!book){
      res.status(500).json("book not found")
    }
    res.status(200).json(book);
  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
}

async updateBook(req :Request ,res: Response){
    try {
      const id=req.params.id;
      const title:string=req.body.title
      const author:ObjectId=req.body.author
      const category:ObjectId=req.body.category
      const ISBN:number=req.body.ISBN
      const description:string=req.body.description
      const price:number=req.body.price
      const book=await book_service.updateBook(id,title,author,category,ISBN,description,price)
      if(!book){
        return res.status(400).json("book not found")
      }
      
      res.status(200).json('book updated');
  
    } catch (error:any) {
      res.status(500).json({message:error.message})
      
    }
  }
  async deleteBook(req :Request ,res: Response){
    try {
      const id:string=req.params.id;
      const book=await book_service.deleteBook(id)
      if(!book){
        return res.status(400).json("book not found")
      }
      res.status(200).json("book deleted sucessfully");
    } catch (error:any) {
      res.status(500).json({message:error.message})
    }
}
}

