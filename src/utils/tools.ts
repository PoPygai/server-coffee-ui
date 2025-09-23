import {v4 as uuidv4} from 'uuid';
import {Coffee, CoffeeStatus} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";


export const convertCoffeeDtoTOCoffee = (coffee:CoffeeDto):Coffee=>{
    return {
        id:uuidv4(),
        name:coffee.name,
        price:coffee.price,
        quantity:coffee.quantity,
        status: coffee.status
    }
}
export const convertCoffeeTOCoffeeDto = (coffee:Coffee):CoffeeDto=>{
    return {
        name:coffee.name,
        price:coffee.price,
        quantity:coffee.quantity,
        status: coffee.status
    }
}