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

    //todo
    async changeCoffee(id: number, value: string): Promise<void> {

        return Promise.resolve(undefined);
    }

    async quantityCoffeeByName(name: string): Promise<string> {
        const [result] = await configuration.pool.query("SELECT quantity FROM products_coffee WHERE name= ?",[name]);
        return Promise.resolve("");
    }

    async getAllCoffees(): Promise<Coffee[]> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee")
        return Promise.resolve(result as Coffee[]);
    }

    async getCoffeeById(id: number): Promise<Coffee> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee WHERE id=?",[id])
        return Promise.resolve(result as unknown as Coffee);
    }

    //todo
    async removeCoffee(id: number): Promise<void> {
        //DELETE FROM products_coffee WHERE id=?;
        return Promise.resolve(undefined);
    }

}