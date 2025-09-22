import Joi from "joi";

export const schemaBody = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(5).required(),
    quantity: Joi.number().min(0).max(999).required(),
})