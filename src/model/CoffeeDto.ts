import {CoffeeStatus} from "./Coffee";
import Joi from "joi";

export type CoffeeDto={
    name:string,
    price:number,
    quantity:number,
    status:CoffeeStatus,
}
