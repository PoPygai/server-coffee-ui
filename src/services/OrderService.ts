import {OrderDto, Receipt} from "../utils/types";


export interface OrderService{
    addOrder(login:string,orders:OrderDto[]):Promise<Receipt>
    getOrderById(id:string):Promise<Receipt>;
    doneOrder(id:string):Promise<void>
}