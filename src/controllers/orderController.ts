import {configuration} from "../config/config";
import {OrderDto} from "../utils/types";

export class orderController  {


    async order(login: string, body: OrderDto[]) {


        for (let i = 0; i < body.length; i++) {
            let result = await configuration.coffeeService.quantityCoffeeByName(body[i].name)
            let quantity =  result.quantity as number;
            if(quantity-body[i].count < 0 ) throw new Error(JSON.stringify({status:400 ,message:"Coffee not enough for your order "}))
        }

        return await configuration.orderService.addOrder(login,body)


    }

    async getOrder(id: string) {
        return await configuration.orderService.getOrderById(id);
    }

    async deleteOrder(id: string) {
        return await configuration.orderService.doneOrder(id);
    }



}