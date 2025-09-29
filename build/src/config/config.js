"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const AccountServiceImpl_1 = require("../services/AccountServiceImpl");
const types_1 = require("../utils/types");
dotenv_1.default.config();
exports.configuration = {
    port: Number(process.env.PORT),
    accService: new AccountServiceImpl_1.AccountServiceImpl(),
    pool: promise_1.default.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
        database: process.env.DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }),
    poolAccounts: promise_1.default.createPool({
        host: process.env.DB_HOST_ACCOUNTS,
        port: process.env.DB_PORT_ACCOUNTS ? +process.env.DB_PORT_ACCOUNTS : 3306,
        database: process.env.DATABASE,
        user: process.env.DB_ACCOUNTS,
        password: process.env.DB_PASSWORD_ACCOUNTS
    }),
    skipPath: ["POST/account", "GET/coffee-product"],
    pathsRoles: {
        "PUT/coffee-product": [types_1.Roles.ADMIN],
        "DELETE/coffee-product": [types_1.Roles.ADMIN],
        "POST/coffee-product": [types_1.Roles.ADMIN],
        "GET/account": [types_1.Roles.ADMIN, types_1.Roles.ROOT],
        "PUT/account": [types_1.Roles.USER, types_1.Roles.ADMIN],
        "DELETE/account": [types_1.Roles.ADMIN, types_1.Roles.ROOT]
    }
};
