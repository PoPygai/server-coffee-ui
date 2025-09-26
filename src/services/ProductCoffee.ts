import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";


export interface ProductCoffee {
    addCoffee: (coffee : Coffee) => Promise<void>;
    changeCoffee: (id:string,coffee:CoffeeDto) => Promise<boolean>;
    removeCoffee: (id:string) => Promise<void>;
    quantityCoffeeByName: (name:string) => Promise<string>;
    getAllCoffees: () => Promise<Coffee[]>;
    getCoffeeByName: (name:string) => Promise<Coffee>;
    //todo getOrder и тд
}