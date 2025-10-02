import {AuthRequest} from "../utils/types";
import {NextFunction, Response} from "express";
import {normalizePath} from "../utils/tools";
import {configuration} from "../config/config";


export const authorization = (req:AuthRequest,res:Response,next:NextFunction)=>{
    const request = req.method + normalizePath(req.path);
    console.log(request);
    if(configuration.skipPath.some((path)=>path.includes(request)))
        return next();
    if(req.role && configuration.pathsRoles[request].some(role => role === req.role))
        return next();

    next({message : JSON.stringify({status:403,message:"You dont have rights"})});


}
