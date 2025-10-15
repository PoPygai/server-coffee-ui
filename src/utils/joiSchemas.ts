import Joi from "joi";
import {Roles} from "./types";

export const idSchema = Joi.string().length(36).required()

export const loginSchema = Joi.string().alphanum().min(3).max(30).required();

export const accountLoginPasswordSchema = Joi.object({
    login:loginSchema,
    password: Joi.string().min(8).required(),
})

export const nameSchema = Joi.string().min(3).alphanum().required();

export const AccountDtoSchema = Joi.object({
    login : idSchema,
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birthday: Joi.date().required(),
})

export const CoffeeDtoSchema = Joi.object({
    name: nameSchema,
    price: Joi.number().min(5).max(99999).required(),
    quantity: Joi.number().min(0).max(999).required(),
})


export const OrderSchema = Joi.array().items(Joi.object({name: nameSchema,count: Joi.number().min(0).max(999).required()}));

export const AccountRole = Joi.object({
    login: loginSchema,
    role: Joi.string().valid(Roles.ROOT,Roles.ADMIN,Roles.USER).required()
})

export const joiSchemas:Record<string, Joi.ObjectSchema | Joi.ArraySchema> = {
    'POST/account' :  AccountDtoSchema,
    'PUT/account' :  AccountDtoSchema,
    "PATCH/account": AccountRole,

    'PUT/coffee-product' :  CoffeeDtoSchema,
    'POST/coffee-product' :  CoffeeDtoSchema,

    'POST/order':  OrderSchema,
}




