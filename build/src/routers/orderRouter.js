"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderController_1 = require("../controllers/orderController");
exports.orderRouter = express_1.default.Router();
const controller = new orderController_1.orderController();
exports.orderRouter.post('/order', (0, express_async_handler_1.default)(async (req, res) => {
    const result = await controller.order(req.login, req.body);
    res.status(200).json(result);
}));
exports.orderRouter.get('/order/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 403, message: 'bad id' }));
    const result = await controller.getOrder(id);
    res.status(200).json(result);
}));
exports.orderRouter.delete('/order/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 403, message: 'bad id' }));
    const result = await controller.deleteOrder(id);
    res.status(200).json(result);
}));
