import {CoffeeInfo} from "../utils/types";


export interface ProductCoffee {
    addCoffee: (coffee : CoffeeInfo) => Promise<void>;
    changeCoffee: (id:number,value:string) => Promise<void>;
    removeCoffee: (id:number) => Promise<void>;
    countCoffeeByName: (name:string) => Promise<string>;
    getAllCoffees: () => Promise<CoffeeInfo[]>;
    getCoffeeById: (id:number) => Promise<CoffeeInfo>;
    //todo getOrder и тд
}