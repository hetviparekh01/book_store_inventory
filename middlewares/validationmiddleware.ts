
import { Request, Response, NextFunction } from 'express'


export class ValidateMiddleware{

        private schema;
        constructor(schema:any){
            this.schema=schema
            this.validator = this.validator.bind(this);
        }


        async validator(req:Request,res:Response,next:NextFunction){
            const body=req.body
            try {
                // console.log(this.schema);
                await this.schema.validate(body)
                return next()
            } catch (error:any) {
                return res.status(500).json({message:error.message})
            }
        }
}