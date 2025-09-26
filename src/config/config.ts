import dotenv from "dotenv";
import mysql, {Pool} from 'mysql2/promise'
import {AccountService} from "../services/AccountServices";
import {AccountServiceImpl} from "../services/AccountServiceImpl";

export interface AppConfig {
    port: number;
    accService : AccountService;
    pool:Pool
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
    })
}
