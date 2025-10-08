import { ProductCoffeeServiceImpl} from "../services/ProductCoffeeServiceImpl";
import {convertCoffeeDtoToCoffee} from "../utils/tools";
import {CoffeeDto} from "../model/CoffeeDto";
import {Coffee} from "../model/Coffee";
import {CoffeeQuantity, OrderDto} from "../utils/types";
import {configuration} from "../config/config";


export class controllerProductCoffee {


    async addCoffee(product:CoffeeDto): Promise<Coffee> {
        const coffee = convertCoffeeDtoToCoffee(product);
        await configuration.coffeeService.addCoffee(coffee);
        return coffee;
    }

    async changeCoffee(id:string,coffee:CoffeeDto): Promise<any> {
        const result = await configuration.coffeeService.changeCoffee(id,coffee);
        if(result){
            return {
                id,
                ...coffee
            };
        }
        throw new Error(JSON.stringify({status:400 ,message:"Coffee not updated"}))
    }

    async quantityCoffeeByName(name:string): Promise<CoffeeQuantity> {
        return configuration.coffeeService.quantityCoffeeByName(name);
    }

    async getAllCoffees(): Promise<CoffeeDto[]> {
        return await configuration.coffeeService.getAllCoffees();
    }

    async getCoffeeByName(name:string): Promise<CoffeeDto> {
        return await configuration.coffeeService.getCoffeeByName(name)
    }

    async removeCoffee(id: string): Promise<void> {
        await configuration.coffeeService.removeCoffee(id);
    }


}