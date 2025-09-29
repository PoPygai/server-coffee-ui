import Joi from "joi";


export type UserDto = {
    login: string;
    password: string;
    email: string;
    birthday: string;
}

export const userAccountSchema = Joi.object({
    login: Joi.string().max(30).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().length(10).required(),
})