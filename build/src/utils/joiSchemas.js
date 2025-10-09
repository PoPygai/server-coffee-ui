"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiSchemas = exports.OrderSchema = exports.CoffeeDtoSchema = exports.AccountDtoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AccountDtoSchema = joi_1.default.object({
    login: joi_1.default.string().max(30).required(),
    password: joi_1.default.string().min(8).required(),
    email: joi_1.default.string().email().required(),
    birthday: joi_1.default.date().required(),
});
exports.CoffeeDtoSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().min(5).max(99999).required(),
    quantity: joi_1.default.number().min(0).max(999).required(),
});
exports.OrderSchema = joi_1.default.array().items(joi_1.default.object({ name: joi_1.default.string().required(), count: joi_1.default.number().min(0).max(999).required() }));
exports.joiSchemas = {
    'POST/account': exports.AccountDtoSchema,
    'PUT/account': exports.AccountDtoSchema,
    'PUT/coffee-product': exports.CoffeeDtoSchema,
    'POST/coffee-product': exports.CoffeeDtoSchema,
    'POST/order': exports.OrderSchema,
};
