"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coffeeSchema = void 0;
const Coffee_1 = require("./Coffee");
const joi_1 = __importDefault(require("joi"));
exports.coffeeSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().min(5).max(99999).required(),
    quantity: joi_1.default.number().min(0).max(999).required(),
    status: joi_1.default.string().valid(Coffee_1.CoffeeStatus.SOLD, Coffee_1.CoffeeStatus.ON_STOCK),
});
