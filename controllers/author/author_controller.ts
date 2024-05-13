

import {Request,Response} from 'express'
import { AuthorService } from '../../services/authors/author_service'
import { ObjectId } from 'mongoose'
import { IAuthor } from '../../interfaces/IAuthor'
import { statuscode } from '../../constants/statuscode'
import { errorMessage } from '../../constants/message'

const author_service=new AuthorService()

export class AuthorController{
  async getAuthors(req :Request,res :Response ):Promise<Response>{
    try {
        const searchTerm:any=req.query
        const responsedata=await author_service.getAuthors(searchTerm)

        if(responsedata.status){
          return res
          .status(statuscode.success)
          .json(responsedata.content)
        }else{
          return res
          .status(statuscode.NotFound)
          .json(responsedata.content)
        }
      } catch (error:any) {
         return res
         .status(statuscode.error)
         .json({status:false,content:errorMessage.ErrorInGettingAuthor})
      }
}
async createAuthor(req :Request ,res: Response):Promise<Response>{
    try {
      const name:string=req.body.name
      const biography:string=req.body.biography
      const nationality:string=req.body.nationality
      const authordata:object={name,biography,nationality}
      const responsedata=await author_service.createAuthor(authordata as IAuthor)
      if(responsedata.status){
          return res
          .status(statuscode.success)
          .json(responsedata.content)
      }else{
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content)
      }
    } catch (error:any) {
       return res
       .status(statuscode.error)
       .json({status:false,content:errorMessage.ErrorInCreatingAuthor})
    }
}

async getAuthorById(req :Request ,res: Response){
  try {
    const id=req.params.id;    
    const responsedata=await author_service.getAuthorById(id)

    if(responsedata.status){
      return res
      .status(statuscode.success)
      .json(responsedata.content)
    }else{
      return res
      .status(statuscode.NotFound)
      .json(responsedata.content)
    }
  } catch (error:any) {
     return res
     .status(statuscode.error)
     .json({status:false,content:errorMessage.ErrorInGettingAuthor})
  }
}

async updateAuthor(req :Request ,res: Response):Promise<Response>{
    try {
        const id=req.params.id
        const name:string=req.body.name
        const biography:string=req.body.biography
        const nationality:string=req.body.nationality
        const authordata={name,biography,nationality}
        const responsedata =await author_service.updateAuthor(id,authordata as IAuthor)
      if(responsedata.status){
        return res
        .status(statuscode.success)
        .json(responsedata.content)
      }else{
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content);
      }
    } catch (error:any) {
        return res
        .status(statuscode.error)
        .json({status:false,content:errorMessage.ErrorInUpdatingAuthor})
    }
  }
  async deleteAuthor(req :Request ,res: Response):Promise<Response>{
    try {
      const id:string=req.params.id;
      const responsedata=await author_service.deleteAuthor(id)
      if(responsedata.status){
        return res
        .status(statuscode.success)
        .json(responsedata.content)
      }else{
        return res
        .status(statuscode.NotFound)
        .json(responsedata.content);
      }
    } catch (error:any) {
      return res
      .status(statuscode.error)
      .json({status:false,content:errorMessage.ErrorInDeletingAuthor})
    }
}
}


