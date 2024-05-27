import { NextFunction,Request,Response } from 'express';
import { bookingJoiSchema} from '../models/bookingModel';
import { userJoiSchema } from '../models/userModel';
import {ValidationResult,Schema}from 'joi';
import { driverJoiSchema } from '../models/driverModel';
import { userJoiSchema } from '../models/customerModel';

const schemas:Record<string,Schema> = {
  booking:bookingJoiSchema,
  driver:driverJoiSchema,
  user:userJoiSchema,
}
interface validateDataInput{
  property1:string,
  property2:number
}
const validateData = (model:string,data:validateDataInput):ValidationResult=>{
  return schemas[model].validate(data)
  return schemas[model].validate(data)
}

export const validateRequest = (req:Request, res:Response, next:NextFunction) => { 
    const {error} = validateData(req.originalUrl.split('/').at(3)!,req.body)
    if (error) {
    return res.status(404).json({success:false,message:"joischema validation error"+error.details[0].message})
    } 
    next();
};