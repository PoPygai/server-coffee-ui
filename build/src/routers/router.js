"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ProductCoffee_1 = require("../controllers/ProductCoffee");
const joiSchemas_1 = require("../utils/joiSchemas");
const controller = new ProductCoffee_1.controllerProductCoffee();
exports.router = express_1.default.Router();
exports.router.get('/coffee-product/:name', (0, express_async_handler_1.default)(async (req, res) => {
    const name = req.params.name;
    if (!name)
        throw new Error(JSON.stringify({ status: 400, message: 'Empty name of coffee' }));
    const result = await controller.getCoffeeByName(name);
    res.status(200).json(result);
}));
exports.router.get('/coffee-products', (0, express_async_handler_1.default)(async (req, res) => {
    const result = await controller.getAllCoffees();
    res.status(200).json(result);
}));
exports.router.get('/coffee-product/quantity/:name', (0, express_async_handler_1.default)(async (req, res) => {
    const name = req.params.name;
    if (!name)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad name' }));
    const result = await controller.quantityCoffeeByName(name);
    res.status(200).json(res);
}));
exports.router.delete('/coffee-product/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad Id' }));
    const result = await controller.removeCoffee(id);
    res.status(200).json(result);
}));
exports.router.put('/coffee-product/:id', (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new Error(JSON.stringify({ status: 400, message: 'Bad id' }));
    const { error, value } = joiSchemas_1.schemaBody.validate(req.body);
    if (error) {
        throw new Error(JSON.stringify({ status: 400, message: error.message }));
    }
    const result = await controller.changeCoffee(id, value);
    res.status(200).json(result);
}));
exports.router.post('/coffee-product', (0, express_async_handler_1.default)(async (req, res) => {
    const { error, value } = joiSchemas_1.schemaBody.validate(req.body);
    if (error)
        throw new Error(JSON.stringify({ status: 400, message: error.message }));
    const result = await controller.addCoffee(value);
    res.status(200).json(result);
}));
