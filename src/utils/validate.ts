import {Request,Response,NextFunction} from "express";
import {normalizePath} from "./tools";
import {joiSchemas} from "./joiSchemas";


export const validateBody =(req:Request,res:Response,next:NextFunction)=>{
    if(req.body){
        const endpoint = req.method + normalizePath(req.path);
        const schema = joiSchemas[endpoint]
        if(!schema)throw new Error(JSON.stringify({status: 500,message:'Validation schema not found'}));
        const {error} = schema.validate(req.body);
        if(error)throw new Error(JSON.stringify({status: 403,message:error.message}));
    }
    next();
}

