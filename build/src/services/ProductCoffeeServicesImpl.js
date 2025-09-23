"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCoffeeServicesImpl = void 0;
const config_1 = require("../config/config");
class ProductCoffeeServicesImpl {
    async addCoffee(coffee) {
        const result = await config_1.configuration.pool.query("INSERT INTO products_coffee VALUES(?,?,?,?,?)", [coffee.id, coffee.name, coffee.price, coffee.quantity, coffee.status]);
        if (!result)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }
    async changeCoffee(id, coffee) {
        const result = await config_1.configuration.pool.query("UPDATE products_coffee SET name = ?, price = ?, quantity = ?, status = ? WHERE id = ?", [coffee.name, coffee.price, coffee.quantity, coffee.status, id]);
        return Promise.resolve(!result ? false : true);
    }
    async quantityCoffeeByName(name) {
        const [result] = await config_1.configuration.pool.query("SELECT name, quantity FROM products_coffee WHERE name= ?", [name]);
        return Promise.resolve("");
    }
    async getAllCoffees() {
        const [result] = await config_1.configuration.pool.query("SELECT * FROM products_coffee");
        return Promise.resolve(result);
    }
    async getCoffeeByName(name) {
        const [result] = await config_1.configuration.pool.query("SELECT * FROM products_coffee WHERE name=?", [name]);
        return Promise.resolve(result);
    }
    //todo
    async removeCoffee(id) {
        const result = config_1.configuration.pool.query("DELETE FROM products_coffee WHERE id=?", [id]);
        return Promise.resolve(undefined);
    }
}
exports.ProductCoffeeServicesImpl = ProductCoffeeServicesImpl;
