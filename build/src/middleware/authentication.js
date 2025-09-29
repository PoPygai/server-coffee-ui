"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config/config");
const basicAuth = async (header, req) => {
    const hash = header.split(" ")[1];
    const decoded = Buffer.from(hash, "base64").toString("utf8");
    const [login, password] = decoded.split(":");
    try {
        const result = await config_1.configuration.accService.getAccountByLogin(login);
        if (bcryptjs_1.default.compareSync(password, result.hashPassword)) {
            req.login = login;
            req.role = result.role;
        }
        console.log("reader not authenticated");
    }
    catch (e) {
        console.log("reader not authenticated");
    }
};
const authentication = async (req, res, next) => {
    const header = req.header('authorization');
    if (header && header.startsWith("Basic ")) {
        await basicAuth(header, req);
    }
    next();
};
exports.authentication = authentication;
