import {NextFunction, Request, Response} from "express";
import {log} from "node:util";

type newError = {status:number, message:string}

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
    try{
        console.log(err.message)
        const error:newError = JSON.parse(err.message)
        res.status(error.status).end(error.message)
    } catch (e) {
        res.status(500).end(`Unknown server error : ${err.message}`)
    }
}