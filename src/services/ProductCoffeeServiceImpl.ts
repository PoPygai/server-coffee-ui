import {ProductCoffeeService} from "./ProductCoffeeService";
import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {configuration} from "../config/config";
import {CoffeeQuantity, CoffeeReturn} from "../utils/types";
import {ResultSetHeader} from "mysql2";



export class ProductCoffeeServiceImpl implements ProductCoffeeService {


    async changeQuantity(name:string, count:number) {
        await configuration.pool.query("UPDATE products_coffee SET quantity =quantity-? WHERE name = ?;",[count,name]);
    }
    async addCoffee(coffee: Coffee): Promise<void> {

        try{
            await configuration.pool.query("INSERT INTO products_coffee VALUES(?,?,?,?,?)",[coffee.id,coffee.name,coffee.price,coffee.quantity,coffee.status]);
        }catch(e){
            let er =e as Error;
            throw  new Error(JSON.stringify({status: 400,message:er.message}));
        }
    }
    async changeCoffee(id: string, coffee:CoffeeDto): Promise<boolean> {
        const [result] = await configuration.pool.query<ResultSetHeader>(
            "UPDATE products_coffee SET name=?, price =?, quantity=? WHERE id=?",
            [coffee.name, coffee.price, coffee.quantity,  id]
        );

        return Promise.resolve(result.changedRows > 0  );
    }
    async quantityCoffeeByName(name: string): Promise<CoffeeQuantity> {
        const [result] = await configuration.pool.query<CoffeeQuantity[]>("SELECT name, quantity FROM products_coffee WHERE name= ?",[name]);
        if(!result[0]) throw new Error(JSON.stringify({status: 404,message:`No product with name ${name} found.`}))
        return Promise.resolve(result[0]);
    }
    async getAllCoffees(): Promise<CoffeeReturn[]> {
        const [result] = await configuration.pool.query<CoffeeReturn[]>("SELECT * FROM products_coffee")
        return Promise.resolve(result);
    }
    async getCoffeeByName(name: string): Promise<Coffee> {
        const [result] = await configuration.pool.query<CoffeeReturn[]>("SELECT * FROM products_coffee WHERE name=?",[name])
        return Promise.resolve(result[0]);
    }
    async removeCoffee(id: string): Promise<void> {
        const [result] = await configuration.pool.query<CoffeeReturn[]>("SELECT * FROM products_coffee WHERE id=?",[id])
        if(!result[0]) throw new Error(JSON.stringify({status:404,message:"Coffee not found"}))

        await configuration.pool.query("DELETE FROM products_coffee WHERE id=?",[id]);
    }
}

