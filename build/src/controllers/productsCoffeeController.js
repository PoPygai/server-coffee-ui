"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerProductCoffee = void 0;
const tools_1 = require("../utils/tools");
const config_1 = require("../config/config");
class controllerProductCoffee {
    async addCoffee(product) {
        const coffee = (0, tools_1.convertCoffeeDtoToCoffee)(product);
        await config_1.configuration.coffeeService.addCoffee(coffee);
        return coffee;
    }
    async changeCoffee(id, coffee) {
        const result = await config_1.configuration.coffeeService.changeCoffee(id, coffee);
        if (result) {
            return {
                id,
                ...coffee
            };
        }
        throw new Error(JSON.stringify({ status: 400, message: "Coffee not updated" }));
    }
    async quantityCoffeeByName(name) {
        return config_1.configuration.coffeeService.quantityCoffeeByName(name);
    }
    async getAllCoffees() {
        return await config_1.configuration.coffeeService.getAllCoffees();
    }
    async getCoffeeByName(name) {
        return await config_1.configuration.coffeeService.getCoffeeByName(name);
    }
    async removeCoffee(id) {
        await config_1.configuration.coffeeService.removeCoffee(id);
    }
}
exports.controllerProductCoffee = controllerProductCoffee;
