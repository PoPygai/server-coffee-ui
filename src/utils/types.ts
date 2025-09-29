import {Request} from "express";
import {RowDataPacket} from "mysql2";

export enum Roles{
    GUEST='guess',
    USER='user',
    ADMIN='admin',
    ROOT='root',
}

export interface AuthRequest extends Request{
    login?:string,
    role?:Roles,
}

export interface CoffeeQuantity extends RowDataPacket {
    name: string;
    quantity: string | number;
}
