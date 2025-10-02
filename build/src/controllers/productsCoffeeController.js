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
        await this.services.addCoffee(coffee);
        return coffee;
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
    async order(login, body) {
        for (let i = 0; i < body.length; i++) {
            let { quantity } = await this.services.quantityCoffeeByName(body[i].name);
            // if(quantity-body[i].count < 0 ) {}
        }
        // return await this.services.orderCoffee(body);
    }
}
exports.controllerProductCoffee = controllerProductCoffee;
