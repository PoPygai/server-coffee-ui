import {Request} from "express";

export enum Roles{
    GUEST,
    USER,
    ADMIN,
    ROOT,
}

export interface AuthRequest extends Request{
    login?:string,
    role?:Roles,
}