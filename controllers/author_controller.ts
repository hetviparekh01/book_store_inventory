
import {Request,Response} from 'express'
import { AuthorService } from '../services/authors/author_service'
import { ObjectId } from 'mongoose'

const author_service=new AuthorService()

export class AuthorController{
  async getAuthors(req :Request,res :Response ){
    try {
        const searchTerm:any=req.query
        const response=await author_service.getAuthors(searchTerm)
        res.status(200).json(response)
      } catch (error:any) {
          res.status(500).json({message:error.message})
      }
}
async createAuthor(req :Request ,res: Response){
    try {
      const name:string=req.body.name
      const biography:string=req.body.biography
      const nationality:string=req.body.nationality

      const author=await author_service.createAuthor(name,biography,nationality)
      res.status(200).json(author)
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

async getAuthorById(req :Request ,res: Response){
  try {
    const id=req.params.id;
    const author=await author_service.getAuthorById(id)
    if(!author){
      res.status(500).json("author not found")
    }
    res.status(200).json(author);
  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
}

async updateAuthor(req :Request ,res: Response){
    try {
        const id=req.params.id
        const name:string=req.body.name
        const biography:string=req.body.biography
        const nationality:string=req.body.nationality
        const author=await author_service.updateAuthor(id,name,biography,nationality)
      if(!author){
        return res.status(400).json("author not found")
      }
      
      res.status(200).json('author updated');
  
    } catch (error:any) {
      res.status(500).json({message:error.message})
      
    }
  }
  async deleteAuthor(req :Request ,res: Response){
    try {
      const id:string=req.params.id;
      const author=await author_service.deleteAuthor(id)
      if(!author){
        return res.status(400).json("author not found")
      }
      res.status(200).json("author deleted sucessfully");
    } catch (error:any) {
      res.status(500).json({message:error.message})
    }
}
}

