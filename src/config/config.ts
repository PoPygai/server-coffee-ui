import dotenv from "dotenv";
import mysql, {Pool} from 'mysql2/promise'
import {AccountService} from "../services/AccountServices";
import {AccountServiceImpl} from "../services/AccountServiceImpl";
import {Roles} from "../utils/types";

export interface AppConfig {
    port: number;
    accService : AccountService;
    pool:Pool;
    poolAccounts:Pool;
    skipPath:string[];
    pathsRoles:Record<string, Roles[]>
}

dotenv.config();


export const configuration:AppConfig = {
    port: Number(process.env.PORT),
    accService : new AccountServiceImpl(),
    pool: mysql.createPool({
        host:process.env.DB_HOST ,
        port:process.env.DB_PORT ? +process.env.DB_PORT :  3306,
        database:process.env.DATABASE,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    }),
    poolAccounts: mysql.createPool({
        host:process.env.DB_HOST_ACCOUNTS ,
        port:process.env.DB_PORT_ACCOUNTS ? +process.env.DB_PORT_ACCOUNTS :  3306,
        database:process.env.DATABASE,
        user:process.env.DB_ACCOUNTS,
        password:process.env.DB_PASSWORD_ACCOUNTS
    }),
    skipPath :["POST/account","GET/coffee-product"],
    pathsRoles:{
        "PUT/coffee-product":[Roles.ADMIN],
        "DELETE/coffee-product":[Roles.ADMIN],
        "POST/coffee-product":[Roles.ADMIN],
        "GET/account":[Roles.ADMIN,Roles.ROOT],
        "PUT/account":[Roles.USER,Roles.ADMIN],
        "DELETE/account":[Roles.ADMIN,Roles.ROOT]
    }

}
