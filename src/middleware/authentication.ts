import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";
import {AuthRequest, Roles} from "../utils/types";
import {configuration} from "../config/config";
import jwt, {JwtPayload} from "jsonwebtoken";


const basicAuth = async(header:string,req:AuthRequest) => {
    const hash = header.split(" ")[1];
    const decoded = Buffer.from(hash, "base64").toString("utf8");
    const [login, password] = decoded.split(":");
    if(login === process.env.ROOT_LOGIN && password === process.env.ROOT_PASSWORD) {
        req.login = login;
        req.role = Roles.ROOT;
    }else{
        try{
            const result = await configuration.accService.getAccountByLogin(login);
            if(bcrypt.compareSync(password,result.hashPassword)){
                req.login = login;
                req.role = result.role;
            }
            console.log("reader not authenticated")

        } catch(e){
            console.log("reader not authenticated")
        }
    }
}
const jwtAuth = (headers:string,req:AuthRequest)=>{

    const token = headers.substring("Bearer ".length);

    try{
        const payload = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;
        req.login = payload.sub;
        req.role = payload.roles;

    }catch(e){
        throw new Error(JSON.stringify({status:401,message:"Invalid token"}))
    }
}

export const authentication = async (req:Request,res:Response,next:NextFunction) => {
    const header = req.header('authorization');

    if(header) {
            if(header.startsWith("Basic "))
                await basicAuth(header,req);
            else if(header.startsWith("Bearer "))
                await jwtAuth(header,req);
    }
    next();
}