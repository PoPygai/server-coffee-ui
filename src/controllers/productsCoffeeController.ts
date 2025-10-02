import { ProductCoffeeServicesImpl} from "../services/ProductCoffeeServicesImpl";
import {convertCoffeeDtoToCoffee} from "../utils/tools";
import {CoffeeDto} from "../model/CoffeeDto";
import {Coffee} from "../model/Coffee";
import {CoffeeQuantity, Order} from "../utils/types";


export class controllerProductCoffee {

    private services = new ProductCoffeeServicesImpl();

    async addCoffee(product:CoffeeDto): Promise<Coffee> {
        const coffee = convertCoffeeDtoToCoffee(product);
        await this.services.addCoffee(coffee);
        return coffee;
    }

    async changeCoffee(id:string,coffee:CoffeeDto): Promise<any> {
        const result = await this.services.changeCoffee(id,coffee);
        if(result){
            return {
                id,
                ...coffee
            };
        }
        throw new Error(JSON.stringify({status:400 ,message:"Coffee not updated"}))
    }

    async quantityCoffeeByName(name:string): Promise<CoffeeQuantity> {
        return this.services.quantityCoffeeByName(name);
    }

    async getAllCoffees(): Promise<CoffeeDto[]> {
        return await this.services.getAllCoffees();
    }

    async getCoffeeByName(name:string): Promise<CoffeeDto> {
        return await this.services.getCoffeeByName(name)
    }

    async removeCoffee(id: string): Promise<void> {
        await this.services.removeCoffee(id);
    }

    async order(login:string,body:Order[]) {
        for (let i = 0; i < body.length; i++) {
            let result = await this.services.quantityCoffeeByName(body[i].name)
            let quantity =  result.quantity as number;
            if(quantity-body[i].count < 0 ) throw new Error(JSON.stringify({status:400 ,message:"Coffee not enough for your order "}))
        }
        return await this.services.orderCoffee(login,body);
    }
}