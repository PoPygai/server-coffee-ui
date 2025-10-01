"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const jwtAuth = (headers, req) => {
    //todo
    if (!process.env.JWT_KEY)
        throw new Error(JSON.stringify({ status: 500, message: "Problem with server" }));
    const token = headers.substring("Bearer ".length);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.login = payload.sub;
        req.role = payload.roles;
    }
    catch (e) {
        throw new Error(JSON.stringify({ status: 401, message: "Invalid token" }));
    }
};
const authentication = async (req, res, next) => {
    const header = req.header('authorization');
    if (header) {
        if (header.startsWith("Basic "))
            await basicAuth(header, req);
        else if (header.startsWith("Bearer "))
            await jwtAuth(header, req);
    }
    next();
};
exports.authentication = authentication;
