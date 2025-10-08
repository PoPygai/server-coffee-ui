"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServiceImpl = void 0;
const config_1 = require("../config/config");
const tools_1 = require("../utils/tools");
const uuid_1 = require("uuid");
class OrderServiceImpl {
    async getOrderById(id) {
        const [result] = await config_1.configuration.pool.query("SELECT * FROM orders WHERE orderId = ?", [id]);
        if (!result[0])
            throw new Error(JSON.stringify({ status: 403, message: 'Order not found' }));
        const { orderId, nameUser, orderDate, sum_cost } = result[0];
        const [rows] = await config_1.configuration.pool.query("SELECT orderName,quantity FROM order_items WHERE orderId = ?", [id]);
        const coffeesDto = [];
        for (let i = 0; i < rows.length; i++) {
            const coffee = await config_1.configuration.coffeeService.getCoffeeByName(rows[i].orderName);
            const coffeeDto = (0, tools_1.convertCoffeeToCoffeeDto)(coffee);
            coffeeDto.quantity = rows[i].quantity;
            coffeesDto.push(coffeeDto);
        }
        return Promise.resolve({
            orderId,
            nameUser,
            date: orderDate,
            orders: coffeesDto,
            cost: Number(sum_cost),
        });
    }
    async doneOrder(id) {
        try {
            await config_1.configuration.pool.query("DELETE FROM order_items WHERE orderId = ?", [id]);
            await config_1.configuration.pool.query("DELETE FROM orders WHERE orderId = ?", [id]);
        }
        catch (error) {
            throw new Error(JSON.stringify({ status: 401, message: 'Invalid credentials' }));
        }
    }
    async addOrder(login, orders) {
        const coffeesDto = [];
        let sum = 0;
        for (let i = 0; i < orders.length; i++) {
            //todo
            const coffee = await config_1.configuration.coffeeService.getCoffeeByName(orders[i].name);
            const coffeeDto = (0, tools_1.convertCoffeeToCoffeeDto)(coffee);
            coffeeDto.quantity = orders[i].count;
            sum += coffeeDto.quantity * coffeeDto.price;
            coffeesDto.push(coffeeDto);
        }
        const orderId = (0, uuid_1.v4)();
        const now = new Date();
        const date = now.toISOString().slice(0, 19).replace('T', ' ');
        try {
            await config_1.configuration.pool.query('INSERT INTO orders VALUES(?,?,?,?)', [orderId, login, date, sum]);
            for (let i = 0; i < coffeesDto.length; i++) {
                await config_1.configuration.pool.query('INSERT INTO order_items (orderId,orderName, quantity,cost)VALUES(?,?,?,?)', [orderId, coffeesDto[i].name, coffeesDto[i].quantity, coffeesDto[i].price]);
            }
        }
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({ status: 401, message: 'Invalid credentials' }));
        }
        for (let i = 0; i < orders.length; i++) {
            //todo
            await config_1.configuration.coffeeService.changeQuantity(orders[i].name, orders[i].count);
        }
        return Promise.resolve({
            orderId,
            nameUser: login,
            date,
            orders: coffeesDto,
            cost: sum,
        });
    }
}
exports.OrderServiceImpl = OrderServiceImpl;
