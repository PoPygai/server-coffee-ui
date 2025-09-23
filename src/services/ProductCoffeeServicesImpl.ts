import {ProductCoffee} from "./ProductCoffee";
import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {configuration} from "../config/config";


export class ProductCoffeeServicesImpl implements ProductCoffee{
    async addCoffee(coffee: Coffee): Promise<boolean> {

        const result = await configuration.pool.query("INSERT INTO products_coffee VALUES(?,?,?,?,?)",[coffee.id,coffee.name,coffee.price,coffee.quantity,coffee.status]);
        if(!result)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }


    async changeCoffee(id: string, coffee:CoffeeDto): Promise<boolean> {
        const result = await configuration.pool.query(
            "UPDATE products_coffee SET name = ?, price = ?, quantity = ?, status = ? WHERE id = ?",
            [coffee.name, coffee.price, coffee.quantity, coffee.status, id]
        );

        return Promise.resolve(!result ? false : true);
    }

    async quantityCoffeeByName(name: string): Promise<string> {
        const [result] = await configuration.pool.query("SELECT name, quantity FROM products_coffee WHERE name= ?",[name]);
        return Promise.resolve("");
    }

    async getAllCoffees(): Promise<Coffee[]> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee")
        return Promise.resolve(result as Coffee[]);
    }

    async getCoffeeByName(name: string): Promise<Coffee> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee WHERE name=?",[name])
        return Promise.resolve(result as unknown as Coffee);
    }

    //todo
    async removeCoffee(id: string): Promise<void> {
        const result = configuration.pool.query("DELETE FROM products_coffee WHERE id=?",[id]);
        return Promise.resolve(undefined);

    }

}