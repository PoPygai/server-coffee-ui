import {CoffeeStatus} from "./Coffee";

export type CoffeeDto={
    name:string,
    price:number,
    quantity:number,
    status:CoffeeStatus,
}