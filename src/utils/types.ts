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
export interface OrderQuantity extends RowDataPacket {
    orderId:string;
    nameUser: string;
    quantity: Date;
    sum_cost:string;
}
export interface OrderItemsQuantity extends RowDataPacket {
    orderName: string;
    quantity: number;
}

export type Receipt = {
    orderId: string;
    nameUser:string;
    date: string;
    orders : CoffeeDto[];
    cost:number;
}
export type OrderDto = {
    name:string;
    count:number;
}
//todo
export type Order = {
    orderId :string;
    nameUser :string;
    date :string;
    login:string;
    orders:CoffeeDto[];
    cost :number;
}