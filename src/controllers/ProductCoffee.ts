import {ProductCoffee} from "../services/ProductCoffee";
import {ProductCoffeeServicesImpl} from "../services/ProductCoffeeServicesImpl";
import {convertCoffeDtoTOCoffee} from "../utils/tools";
import {CoffeeDto} from "../model/CoffeeDto";
import {Coffee} from "../model/Coffee";


export class controllerProductCoffee {

    private services = new ProductCoffeeServicesImpl();

    async addCoffee(product:CoffeeDto): Promise<Coffee> {
        const coffee = convertCoffeDtoTOCoffee(product);
        const res = await this.services.addCoffee(coffee);
        if(res){
            return coffee;
        }
        throw new Error(JSON.stringify({status: 403, message: `Book with id ${coffee.id} not added`}))
    }

    async changeCoffee(id:number,name:string): Promise<void> {
        await this.services.changeCoffee(id,name);
    }

    async quantityCoffeeByName(name:string): Promise<string> {
        return this.services.quantityCoffeeByName(name);
    }

    async getAllCoffees(): Promise<CoffeeDto[]> {
        return await this.services.getAllCoffees();
    }

    async getCoffeeById(id:number): Promise<CoffeeDto> {
        return await this.services.getCoffeeById(id)
    }

    async removeCoffee(id:number): Promise<void> {
        await this.services.removeCoffee(id);
    }

}