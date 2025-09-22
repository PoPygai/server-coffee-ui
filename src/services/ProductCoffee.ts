import {Coffee} from "../model/Coffee";


export interface ProductCoffee {
    addCoffee: (coffee : Coffee) => Promise<boolean>;
    changeCoffee: (id:number,value:string) => Promise<void>;
    removeCoffee: (id:number) => Promise<void>;
    quantityCoffeeByName: (name:string) => Promise<string>;
    getAllCoffees: () => Promise<Coffee[]>;
    getCoffeeById: (id:number) => Promise<Coffee>;
    //todo getOrder и тд
}