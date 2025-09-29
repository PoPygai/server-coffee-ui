import {ProductCoffee} from "./ProductCoffee";
import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {configuration} from "../config/config";
import {CoffeeQuantity} from "../utils/types";



export class ProductCoffeeServicesImpl implements ProductCoffee{
    async addCoffee(coffee: Coffee): Promise<void> {

        try{
            await configuration.pool.query("INSERT INTO products_coffee VALUES(?,?,?,?,?)",[coffee.id,coffee.name,coffee.price,coffee.quantity,coffee.status]);
        }catch(e){
            let er =e as Error;
            throw  new Error(JSON.stringify({status: 400,message:er.message}));
        }
    }
    async changeCoffee(id: string, coffee:CoffeeDto): Promise<boolean> {
        const [result] = await configuration.pool.query(
            "UPDATE products_coffee SET name=?, price =?, quantity=?, status=? WHERE id=?",
            [coffee.name, coffee.price, coffee.quantity, coffee.status, id]
        );

        return Promise.resolve(!result ? false : true);
    }
    async quantityCoffeeByName(name: string): Promise<CoffeeQuantity> {
        const [result] = await configuration.pool.query<CoffeeQuantity[]>("SELECT name, quantity FROM products_coffee WHERE name= ?",[name]);
        return Promise.resolve(result[0]);
    }
    async getAllCoffees(): Promise<Coffee[]> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee")
        return Promise.resolve(result as Coffee[]);
    }
    async getCoffeeByName(name: string): Promise<Coffee> {
        const [result] = await configuration.pool.query("SELECT * FROM products_coffee WHERE name=?",[name])
        return Promise.resolve((result as Coffee[])[0]);
    }
    async removeCoffee(id: string): Promise<void> {
        await configuration.pool.query("DELETE FROM products_coffee WHERE id=?",[id]);
    }
}