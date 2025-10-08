"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServer = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const productsCoffeeRouter_1 = require("./routers/productsCoffeeRouter");
const node_fs_1 = require("node:fs");
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./errorHandler/errorHandler");
const accountRouter_1 = require("./routers/accountRouter");
const authentication_1 = require("./middleware/authentication");
const authorization_1 = require("./middleware/authorization");
const validate_1 = require("./utils/validate");
const orderRouter_1 = require("./routers/orderRouter");
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
    app.use(express_1.default.json());
    app.use(authentication_1.authentication);
    app.use(authorization_1.authorization);
    app.use(validate_1.validateBody);
    //=====================Router=======================
    app.use('/accounts/', accountRouter_1.accountRouter);
    app.use('/', productsCoffeeRouter_1.productsCoffeeRouter);
    app.use('/orders', orderRouter_1.orderRouter);
    //====================errorHandling============
    app.use(errorHandler_1.errorHandler);
};
exports.launchServer = launchServer;
