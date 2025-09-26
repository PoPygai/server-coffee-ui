import {AuthRequest} from "../utils/types";
import {NextFunction, Response} from "express";


export const authorization = async(req:AuthRequest,res:Response,next:NextFunction)=>{

    //todo make normonizepath
    const request = req.method + req.path;
    console.log(request);

    //todo
    const skipPath = ["POST/account"]


    if(skipPath.some((path)=>path.includes(request))){
        return next();
    }


    if(req.role!==undefined && req.login!==undefined){

    }
    next(JSON.stringify({status:403,statusText:"You dont have rights"}))


}

const skipPath = ["POST/account","POST/account1","POST/account2"]
console.log();