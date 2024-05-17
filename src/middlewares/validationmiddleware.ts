     import { Request, Response, NextFunction } from "express";
     import { statuscode } from "@constants";

     export class ValidateMiddleware {
          private schema;
          constructor(schema: any) {
               this.schema = schema;
               this.validator = this.validator.bind(this);
          }

          async validator(req: Request, res: Response, next: NextFunction) {
               const body = req.body;
               try {
                    await this.schema.validate(body);
                    return next();
               } catch (error: any) {
                    return res
                         .status(statuscode.error)
                         .json({ message: error.message });
               }
          }
     }

     