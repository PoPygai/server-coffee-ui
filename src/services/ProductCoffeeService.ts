import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {CoffeeQuantity, CoffeeReturn} from "../utils/types";


export interface ProductCoffeeService {
    addCoffee: (coffee : Coffee) => Promise<void>;
    changeCoffee: (id:string,coffee:CoffeeDto) => Promise<boolean>;
    removeCoffee: (id:string) => Promise<void>;
    quantityCoffeeByName: (name:string) => Promise<CoffeeQuantity>;
    getAllCoffees: () => Promise<CoffeeReturn[]>;
    getCoffeeByName: (name:string) => Promise<Coffee>;
    changeQuantity: (login:string, count:number) => Promise<void>
}