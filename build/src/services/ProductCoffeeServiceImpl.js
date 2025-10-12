"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCoffeeServiceImpl = void 0;
const config_1 = require("../config/config");
class ProductCoffeeServiceImpl {
    async changeQuantity(name, count) {
        await config_1.configuration.pool.query("UPDATE products_coffee SET quantity =quantity-? WHERE name = ?;", [count, name]);
    }
    async addCoffee(coffee) {
        try {
            await config_1.configuration.pool.query("INSERT INTO products_coffee VALUES(?,?,?,?,?)", [coffee.id, coffee.name, coffee.price, coffee.quantity, coffee.status]);
        }
        catch (e) {
            let er = e;
            throw new Error(JSON.stringify({ status: 400, message: er.message }));
        }
    }
    async changeCoffee(id, coffee) {
        const [result] = await config_1.configuration.pool.query("UPDATE products_coffee SET name=?, price =?, quantity=? WHERE id=?", [coffee.name, coffee.price, coffee.quantity, id]);
        return Promise.resolve(result.changedRows > 0);
    }
    async quantityCoffeeByName(name) {
        const [result] = await config_1.configuration.pool.query("SELECT name, quantity FROM products_coffee WHERE name= ?", [name]);
        if (!result[0])
            throw new Error(JSON.stringify({ status: 404, message: `No product with name ${name} found.` }));
        return Promise.resolve(result[0]);
    }
    async getAllCoffees() {
        const [result] = await config_1.configuration.pool.query("SELECT * FROM products_coffee");
        return Promise.resolve(result);
    }
    async getCoffeeByName(name) {
        const [result] = await config_1.configuration.pool.query("SELECT * FROM products_coffee WHERE name=?", [name]);
        return Promise.resolve(result[0]);
    }
    async removeCoffee(id) {
        await config_1.configuration.pool.query("DELETE FROM products_coffee WHERE id=?", [id]);
    }
}
exports.ProductCoffeeServiceImpl = ProductCoffeeServiceImpl;
