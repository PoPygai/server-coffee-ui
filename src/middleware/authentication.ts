import {Request,Response,NextFunction} from "express";
import bcrypt from "bcryptjs";
import {AuthRequest} from "../utils/types";
import {configuration} from "../config/config";
import jwt, {JwtPayload} from "jsonwebtoken";


const basicAuth = async(header:string,req:AuthRequest) => {
    const hash = header.split(" ")[1];
    const decoded = Buffer.from(hash, "base64").toString("utf8");
    const [login, password] = decoded.split(":");
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
const jwtAuth = (headers:string,req:AuthRequest)=>{
    //todo
    if(!process.env.JWT_KEY) throw new Error(JSON.stringify({status:500,message:"Problem with server"}))

    const token = headers.substring("Bearer ".length);

    try{
        const payload = jwt.verify(token, process.env.JWT_KEY) as JwtPayload;
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