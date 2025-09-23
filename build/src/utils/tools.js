"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCoffeeTOCoffeeDto = exports.convertCoffeeDtoTOCoffee = void 0;
const uuid_1 = require("uuid");
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
const convertCoffeeTOCoffeeDto = (coffee) => {
    return {
        name: coffee.name,
        price: coffee.price,
        quantity: coffee.quantity,
        status: coffee.status
    };
};
exports.convertCoffeeTOCoffeeDto = convertCoffeeTOCoffeeDto;
