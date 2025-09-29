"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = exports.convertUserDtoToUser = exports.convertCoffeeTOCoffeeDto = exports.convertCoffeeDtoTOCoffee = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("./types");
const convertCoffeeDtoTOCoffee = (coffee) => {
    return {
        id: (0, uuid_1.v4)(),
        name: coffee.name,
        price: coffee.price,
        quantity: coffee.quantity,
        status: coffee.status
    };
};
exports.convertCoffeeDtoTOCoffee = convertCoffeeDtoTOCoffee;
//todo почему не использовается
const convertCoffeeTOCoffeeDto = (coffee) => {
    return {
        name: coffee.name,
        price: coffee.price,
        quantity: coffee.quantity,
        status: coffee.status
    };
};
exports.convertCoffeeTOCoffeeDto = convertCoffeeTOCoffeeDto;
const convertUserDtoToUser = (user) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(user.password, salt);
    return {
        login: user.login,
        hashPassword: hash,
        email: user.email,
        birthday: user.birthday,
        role: types_1.Roles.USER
    };
};
exports.convertUserDtoToUser = convertUserDtoToUser;
const normalizePath = (path) => {
    if (path.startsWith("/account"))
        return "/account";
    if (path.startsWith("/coffee-product"))
        return "/coffee-product";
    return path;
};
exports.normalizePath = normalizePath;
