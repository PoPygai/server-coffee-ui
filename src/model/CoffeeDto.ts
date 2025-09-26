import {CoffeeStatus} from "./Coffee";
import Joi from "joi";

export type CoffeeDto={
    name:string,
    price:number,
    quantity:number,
    status:CoffeeStatus,
}


export const coffeeSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(5).max(99999).required(),
    quantity: Joi.number().min(0).max(999).required(),
    status: Joi.string().valid(CoffeeStatus.SOLD,CoffeeStatus.ON_STOCK),
})