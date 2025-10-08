"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const config_1 = require("../config/config");
class orderController {
    async order(login, body) {
        for (let i = 0; i < body.length; i++) {
            let result = await config_1.configuration.coffeeService.quantityCoffeeByName(body[i].name);
            let quantity = result.quantity;
            if (quantity - body[i].count < 0)
                throw new Error(JSON.stringify({ status: 400, message: "Coffee not enough for your order " }));
        }
        return await config_1.configuration.orderService.addOrder(login, body);
    }
    async getOrder(id) {
        return await config_1.configuration.orderService.getOrderById(id);
    }
    async deleteOrder(id) {
        return await config_1.configuration.orderService.doneOrder(id);
    }
}
exports.orderController = orderController;
