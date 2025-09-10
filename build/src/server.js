"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServer = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const router_1 = require("./routers/router");
const node_fs_1 = require("node:fs");
const morgan_1 = __importDefault(require("morgan"));
const launchServer = () => {
    //=============Server================================
    const logStream = (0, node_fs_1.createWriteStream)("./logs.log");
    const app = (0, express_1.default)();
    app.listen(config_1.configuration.port, () => {
        console.log(`server starts at http://localhost:${config_1.configuration.port}`);
    });
    //============================Middleware================
    app.use((0, morgan_1.default)('dev'));
    app.use((0, morgan_1.default)('combined', { stream: logStream }));
    //=====================Router=======================
    app.use('/', router_1.router);
};
exports.launchServer = launchServer;
