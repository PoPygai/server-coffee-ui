"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsCoffeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productsCoffeeController_1 = require("../controllers/productsCoffeeController");
const controller = new productsCoffeeController_1.controllerProductCoffee();
exports.productsCoffeeRouter = express_1.default.Router();
exports.productsCoffeeRouter.get('/coffee-product/:name', (0, express_async_handler_1.default)(async (req, res) => {
    const name = req.params.name;
    if (!name)
        throw new Error(JSON.stringify({ status: 400, message: 'Empty name of coffee' }));
    const result = await controller.getCoffeeByName(name);
    res.status(200).json(result);
}));
exports.productsCoffeeRouter.get('/coffee-products', (0, express_async_handler_1.default)(async (req, res) => {
    const result = await controller.getAllCoffees();
    res.status(200).json(result);
}));
exports.productsCoffeeRouter.get('/coffee-product/quantity/:name', (0, express_async_handler_1.default)(async (req, res) => {
    const name = req.params.name;
    if (!name)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad name' }));
    const result = await controller.quantityCoffeeByName(name);
    res.status(200).json(result);
}));
exports.productsCoffeeRouter.delete('/coffee-product/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad Id' }));
    await controller.removeCoffee(id);
    res.status(200).json({ status: 200, message: 'Coffee Deleted' });
}));
exports.productsCoffeeRouter.put('/coffee-product/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad id' }));
    const result = await controller.changeCoffee(id, req.body);
    res.status(200).json(result);
}));
exports.productsCoffeeRouter.post('/coffee-product', (0, express_async_handler_1.default)(async (req, res) => {
    const result = await controller.addCoffee(req.body);
    res.status(200).json(result);
}));
exports.productsCoffeeRouter.get('/order', (0, express_async_handler_1.default)(async (req, res) => {
    const result = await controller.order(req.login, req.body);
    res.status(200).json(result);
}));
