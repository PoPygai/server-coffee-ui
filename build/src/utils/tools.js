"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWT = exports.normalizePath = exports.convertUserDtoToUser = exports.convertCoffeeToCoffeeDto = exports.convertCoffeeDtoToCoffee = void 0;
const uuid_1 = require("uuid");
const Coffee_1 = require("../model/Coffee");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("./types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const convertCoffeeDtoToCoffee = (coffee) => {
    return {
        id: (0, uuid_1.v4)(),
        name: coffee.name,
        price: coffee.price,
        quantity: coffee.quantity,
        status: Coffee_1.CoffeeStatus.ON_STOCK
    };
};
exports.convertCoffeeDtoToCoffee = convertCoffeeDtoToCoffee;
const convertCoffeeToCoffeeDto = (coffee) => {
    return {
        name: coffee.name,
        price: coffee.price,
        quantity: coffee.quantity,
    };
};
exports.convertCoffeeToCoffeeDto = convertCoffeeToCoffeeDto;
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
    if (path.startsWith("/accounts/account"))
        return "/account";
    if (path.startsWith("/coffee-product"))
        return "/coffee-product";
    if (path.startsWith("/orders/order"))
        return "/order";
    return path;
};
exports.normalizePath = normalizePath;
const getJWT = (login, roles) => {
    //todo
    const options = {
        expiresIn: process.env.JWT_EXP,
        subject: login,
    };
    const token = jsonwebtoken_1.default.sign({ roles }, process.env.JWT_KEY, options);
    return token;
};
exports.getJWT = getJWT;
