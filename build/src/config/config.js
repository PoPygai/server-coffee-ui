"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
const AccountServiceImpl_1 = require("../services/AccountServiceImpl");
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
    })
};
