"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserDto_1 = require("../model/UserDto");
exports.accountRouter = (0, express_1.Router)();
const controller = new accountController_1.accountController();
exports.accountRouter.get('/account/:login', (0, express_async_handler_1.default)(async (req, res) => {
    const login = req.params.login;
    if (!login)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad Login' }));
    const result = await controller.getAccountByLogin(login);
    res.status(200).json(result);
}));
exports.accountRouter.post('/account', (0, express_async_handler_1.default)(async (req, res) => {
    const { error, value } = UserDto_1.userAccountSchema.validate(req.body);
    if (error)
        throw new Error(JSON.stringify({ status: 400, message: error.message }));
    const result = await controller.addAccount(value);
    res.status(200).json(result);
}));
exports.accountRouter.put('/account', (0, express_async_handler_1.default)(async (req, res) => {
    const { error, value } = UserDto_1.userAccountSchema.validate(req.body);
    if (error)
        throw new Error(JSON.stringify({ status: 400, message: error.message }));
    const result = await controller.updateAccount(value);
    res.status(200).json(result);
}));
exports.accountRouter.delete('/account/:login', (0, express_async_handler_1.default)(async (req, res) => {
    const login = req.params.login;
    if (!login)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad Login' }));
    await controller.deleteAccount(login);
    res.status(200).json({ status: 200, message: 'Account Deleted' });
}));
