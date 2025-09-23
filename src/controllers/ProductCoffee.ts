import {ProductCoffeeServicesImpl} from "../services/ProductCoffeeServicesImpl";
import {convertCoffeeDtoTOCoffee} from "../utils/tools";
import {CoffeeDto} from "../model/CoffeeDto";
import {Coffee} from "../model/Coffee";


export class controllerProductCoffee {

    private services = new ProductCoffeeServicesImpl();

    async addCoffee(product:CoffeeDto): Promise<Coffee> {
        const coffee = convertCoffeeDtoTOCoffee(product);
        const res = await this.services.addCoffee(coffee);
        if(res){
            return coffee;
        }
        throw new Error(JSON.stringify({status: 400, message: `Book with id ${coffee.id} not added`}))
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

    async quantityCoffeeByName(name:string): Promise<string> {
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

}