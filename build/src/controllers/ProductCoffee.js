"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerProductCoffee = void 0;
const ProductCoffeeServicesImpl_1 = require("../services/ProductCoffeeServicesImpl");
const tools_1 = require("../utils/tools");
class controllerProductCoffee {
    constructor() {
        this.services = new ProductCoffeeServicesImpl_1.ProductCoffeeServicesImpl();
    }
    async addCoffee(product) {
        const coffee = (0, tools_1.convertCoffeeDtoTOCoffee)(product);
        const res = await this.services.addCoffee(coffee);
        if (res) {
            return coffee;
        }
        throw new Error(JSON.stringify({ status: 400, message: `Book with id ${coffee.id} not added` }));
    }
    async changeCoffee(id, coffee) {
        const result = await this.services.changeCoffee(id, coffee);
        if (result) {
            return {
                id,
                ...coffee
            };
        }
        throw new Error(JSON.stringify({ status: 400, message: "Coffee not updated" }));
    }
    async quantityCoffeeByName(name) {
        return this.services.quantityCoffeeByName(name);
    }
    async getAllCoffees() {
        return await this.services.getAllCoffees();
    }
    async getCoffeeByName(name) {
        return await this.services.getCoffeeByName(name);
    }
    async removeCoffee(id) {
        await this.services.removeCoffee(id);
    }
}
exports.controllerProductCoffee = controllerProductCoffee;
