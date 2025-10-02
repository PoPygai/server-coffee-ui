import {Coffee} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {CoffeeQuantity, Order, Receipt} from "../utils/types";


export interface ProductCoffee {
    addCoffee: (coffee : Coffee) => Promise<void>;
    changeCoffee: (id:string,coffee:CoffeeDto) => Promise<boolean>;
    removeCoffee: (id:string) => Promise<void>;
    quantityCoffeeByName: (name:string) => Promise<CoffeeQuantity>;
    getAllCoffees: () => Promise<Coffee[]>;
    getCoffeeByName: (name:string) => Promise<Coffee>;
    orderCoffee : (login:string,orders:Order[])=>Promise<Receipt>;
}