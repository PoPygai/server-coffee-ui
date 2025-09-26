import {Request,Response,NextFunction} from "express";
import bcrypt, {decodeBase64} from "bcryptjs";
import {AuthRequest} from "../utils/types";
import {configuration} from "../config/config";

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
    } catch(e){
        console.log("reader not authenticated")
    }
}

export const authentication = async (req:Request,res:Response,next:NextFunction) => {
    const header = req.header('authorization');

    if(header && header.startsWith("Basic ")) {
        await basicAuth(header,req);
    }
    next();
}