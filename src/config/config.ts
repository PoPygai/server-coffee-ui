import dotenv from "dotenv";
import mysql, {Pool} from 'mysql2/promise'

export interface AppConfig {
    port: number;
    pool:Pool
}

dotenv.config();
export const configuration:AppConfig = {
    port: Number(process.env.PORT),
    pool: mysql.createPool({
        host:process.env.DB_HOST ,
        port:process.env.DB_PORT ? +process.env.DB_PORT :  3306,
        database:process.env.DATABASE,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD
    })
}
