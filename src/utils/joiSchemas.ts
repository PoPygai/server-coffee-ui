import Joi from "joi";
import {CoffeeStatus} from "../model/Coffee";

export const schemaBody = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(5).max(99999).required(),
    quantity: Joi.number().min(0).max(999).required(),
    status: Joi.string().valid(CoffeeStatus.SOLD,CoffeeStatus.ON_STOCK),
})


