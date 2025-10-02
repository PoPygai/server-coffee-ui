import {ProductCoffee} from "./ProductCoffee";
import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {configuration} from "../config/config";
import {CoffeeQuantity, Order, Receipt} from "../utils/types";
import {convertCoffeeToCoffeeDto} from "../utils/tools";
import {v4 as uuidv4} from "uuid";


export class ProductCoffeeServicesImpl implements ProductCoffee {
    async orderCoffee (login: string, orders: Order[]) {
        const coffeesDto: CoffeeDto[] = [];
        let sum = 0;
        for (let i = 0; i <orders.length ; i++) {
            const coffee = await this.getCoffeeByName(orders[i].name);
            const coffeeDto = convertCoffeeToCoffeeDto(coffee);
            coffeeDto.quantity = orders[i].count;
            sum += coffeeDto.quantity * coffeeDto.price;
            coffeesDto.push(coffeeDto);
            await this.changeQuantity(login,orders[i].count);

        }
        
        //todo нужен запрос к изменинию юзера заказов

        return Promise.resolve({
            orderId:uuidv4(),
            date:new Date().toLocaleString("ru-RU", { hour12: false }),
            nameUser:login,
            orders: coffeesDto,
            cost:sum

        })

    };

    async changeQuantity(login:string, count:number) {
        await configuration.pool.query("UPDATE products_coffee SET quantity =quantity-? WHERE login = ?;",[count,login]);
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
        const [result] = await configuration.pool.query(
            "UPDATE products_coffee SET name=?, price =?, quantity=?, status=? WHERE id=?",
            [coffee.name, coffee.price, coffee.quantity, coffee.status, id]
        );

        return Promise.resolve(!result ? false : true);
    }
    async quantityCoffeeByName(name: string): Promise<CoffeeQuantity> {
        const [result] = await configuration.pool.query<CoffeeQuantity[]>("SELECT name, quantity FROM products_coffee WHERE name= ?",[name]);
        if(!result[0]) throw new Error(JSON.stringify({status: 400,message:`No product with name ${name} found.`}))
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