import {v4 as uuidv4} from 'uuid';
import {Coffee, CoffeeStatus} from "../model/Coffee";
import {CoffeeDto} from "../model/CoffeeDto";


export const convertCoffeDtoTOCoffee = (coffee:CoffeeDto):Coffee=>{
    return {
        id:uuidv4(),
        name:coffee.name,
        price:coffee.price,
        quantity:coffee?.quantity,
        status: CoffeeStatus.ON_STOCK
    }
}
export const convertCoffeTOCoffeeDto = (coffee:Coffee):CoffeeDto=>{
    return {
        name:coffee.name,
        price:coffee.price,
        quantity:coffee?.quantity,
    }
}