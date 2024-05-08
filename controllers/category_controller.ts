
import {Request,Response} from 'express'
import { CategoryService } from '../services/categories/category_service'


const category_service=new CategoryService()

export class CategoryController{
  async getCategories(req :Request,res :Response ){
    try {
        const searchTerm:any=req.query
        const categories=await category_service.getCategories(searchTerm)
        res.status(200).json(categories)
      } catch (error:any) {
          res.status(500).json({message:error.message})
      }
}
async createCategory(req :Request ,res: Response){
    try {
      const name:string=req.body.name

      const category=await category_service.createCategory(name)
      res.status(200).json(category)
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }
}

async getCategoryById(req :Request ,res: Response){
  try {
    const id=req.params.id;
    const category=await category_service.getCategoryById(id)
    if(!category){
      res.status(500).json("category not found")
    }
    res.status(200).json(category);
  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
}

async updateCategory(req :Request ,res: Response){
    try {
        const id=req.params.id
        const name:string=req.body.name
        
        const category=await category_service.updateCategory(id,name)
      if(!category){
        return res.status(400).json("category not found")
      }
      
      res.status(200).json('category updated');
  
    } catch (error:any) {
      res.status(500).json({message:error.message})
      
    }
  }
  async deleteCategory(req :Request ,res: Response){
    try {
      const id:string=req.params.id;
      const category=await category_service.deleteCategory(id)
      if(!category){
        return res.status(400).json("category not found")
      }
      res.status(200).json("category deleted sucessfully");
    } catch (error:any) {
      res.status(500).json({message:error.message})
    }
}
}
