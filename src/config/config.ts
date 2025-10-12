import dotenv from "dotenv";
import mysql, {Pool} from 'mysql2/promise'
import {AccountService} from "../services/AccountServices";
import {AccountServiceImpl} from "../services/AccountServiceImpl";
import {Roles} from "../utils/types";
import {OrderServiceImpl} from "../services/OrderServiceImpl";
import {OrderService} from "../services/OrderService";
import {ProductCoffeeService} from "../services/ProductCoffeeService";
import {ProductCoffeeServiceImpl} from "../services/ProductCoffeeServiceImpl";

export interface AppConfig {
    port: number;
    coffeeService: ProductCoffeeService
    accService : AccountService;
    orderService : OrderService;
    pool:Pool;
    poolAccounts:Pool;
    skipPath:string[];
    pathsRoles:Record<string, Roles[]>
}

dotenv.config();


export const configuration:AppConfig = {
    port: Number(process.env.PORT),
    coffeeService: new ProductCoffeeServiceImpl(),
    accService : new AccountServiceImpl(),
    orderService: new OrderServiceImpl(),
    pool: mysql.createPool({
        host: process.env.DB_HOST,
        port:process.env.DB_PORT ? +process.env.DB_PORT :  3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    poolAccounts: mysql.createPool({
        host:process.env.DB_HOST_ACCOUNTS,
        port:process.env.DB_PORT_ACCOUNTS ? +process.env.DB_PORT_ACCOUNTS :  3306,
        database:process.env.DATABASE,
        user:process.env.DB_ACCOUNTS,
        password:process.env.DB_PASSWORD_ACCOUNTS
    }),
    skipPath :["POST/account","GET/coffee-product","GET/accounts/signin"],
    pathsRoles:{
        "PUT/coffee-product":[Roles.ADMIN,Roles.ROOT],
        "DELETE/coffee-product":[Roles.ADMIN,Roles.ROOT],
        "POST/coffee-product":[Roles.ADMIN,Roles.ROOT],

        "GET/account":[Roles.ADMIN,Roles.ROOT],
        "PUT/account":[Roles.USER,Roles.ADMIN,Roles.ROOT],
        "DELETE/account":[Roles.ADMIN,Roles.ROOT],
        "PATCH/account":[Roles.ADMIN,Roles.ROOT],

        "POST/order":[Roles.USER,Roles.ROOT,Roles.ADMIN],
        "GET/order":[Roles.USER,Roles.ROOT,Roles.ADMIN],
        "DELETE/order":[Roles.ROOT,Roles.ADMIN]
    }

}
