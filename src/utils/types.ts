import {Request} from "express";
import {RowDataPacket} from "mysql2";
import {CoffeeDto} from "../model/CoffeeDto";

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

export type Receipt = {
    orderId: string;
    date: string;
    nameUser:string;
    orders : CoffeeDto[];
    cost:number;
}
export type Order = {
    name:string;
    count:number;
}