import Joi from "joi";

export const AccountDtoSchema = Joi.object({
    login: Joi.string().max(30).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().length(10).required(),
})

export const CoffeeDtoSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(5).max(99999).required(),
    quantity: Joi.number().min(0).max(999).required(),
})

export const OrderSchema = Joi.array().items(Joi.object({name: Joi.string().required(),count: Joi.number().min(0).max(999).required()}));
export const joiSchemas:Record<string, Joi.ObjectSchema | Joi.ArraySchema> = {
    'POST/account' :  AccountDtoSchema,
    'PUT/account' :  AccountDtoSchema,
    'PUT/coffee-product' :  CoffeeDtoSchema,
    'POST/coffee-product' :  CoffeeDtoSchema,
    'POST/order':  OrderSchema,
}