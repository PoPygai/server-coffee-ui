import {v4 as uuidv4} from 'uuid';
import {Coffee, CoffeeStatus} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {UserDto} from "../model/UserDto";
import bcrypt from "bcryptjs";
import {Roles} from "./types";
import jwt, {SignOptions} from "jsonwebtoken";

export const convertCoffeeDtoToCoffee = (coffee:CoffeeDto):Coffee=>{
    return {
        id:uuidv4(),
        name:coffee.name,
        price:coffee.price,
        quantity:coffee.quantity,
        status: CoffeeStatus.ON_STOCK
    }
}
export const convertCoffeeToCoffeeDto = (coffee:Coffee):CoffeeDto=>{
    return {
        name:coffee.name,
        price:coffee.price,
        quantity:coffee.quantity,
    }
}

export const convertUserDtoToUser = (user:UserDto)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    return {
        login:user.login,
        hashPassword: hash,
        email: user.email,
        birthday: user.birthday,
        role:Roles.USER
    }
}

export const normalizePath = (path:string) => {

    if(path.startsWith("/accounts/account")) return "/account";
    if(path.startsWith("/coffee-product")) return "/coffee-product";
    if(path.startsWith("/orders/order")) return "/order";
    return path;

}


export const getJWT = (login:string, roles:Roles) => {
    //todo
    const options:SignOptions = {
        expiresIn: process.env.JWT_EXP as any,
        subject: login,
    }
    const token = jwt.sign({roles},process.env.JWT_KEY!,options);
    return token;
}


console.log(new Date())