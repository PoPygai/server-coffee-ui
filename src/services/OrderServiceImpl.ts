import {OrderDto, OrderQuantity, OrderReturn, Receipt} from "../utils/types";
import {configuration} from "../config/config";
import {convertCoffeeToCoffeeDto} from "../utils/tools";
import {CoffeeDto} from "../model/CoffeeDto";
import {v4 as uuidv4} from "uuid";
import {OrderService} from "./OrderService";


export class OrderServiceImpl implements OrderService {
    async getOrderById(id: string): Promise<Receipt> {
        const [result] = await configuration.pool.query<OrderReturn[]>("SELECT * FROM orders WHERE orderId = ?", [id]);
        if(!result[0]) throw new Error(JSON.stringify({status:403,message:'Order not found'}))
        const {orderId,nameUser,orderDate,sum_cost}= result[0];

        const [rows] = await configuration.pool.query<OrderQuantity[]>("SELECT orderName,quantity FROM order_items WHERE orderId = ?", [id])
        const coffeesDto: CoffeeDto[] = [];

        for (let i = 0; i < rows.length; i++) {
            const coffee = await configuration.coffeeService.getCoffeeByName(rows[i].orderName);
            const coffeeDto = convertCoffeeToCoffeeDto(coffee);
            coffeeDto.quantity = rows[i].quantity;
            coffeesDto.push(coffeeDto);
        }



        return Promise.resolve({
            orderId,
            nameUser,
            date:orderDate,
            orders:coffeesDto,
            cost: Number(sum_cost),
        });
    }

    // delete order
    async doneOrder(id: string): Promise<void> {
        try {
            await configuration.pool.query("DELETE FROM order_items WHERE orderId = ?", [id]);
            await configuration.pool.query("DELETE FROM orders WHERE orderId = ?", [id]);

        }catch (error) {
            throw new Error(JSON.stringify({status:500,message:'Problem while deleting order'}));
        }
    }
    async addOrder(login: string,orders:OrderDto[]): Promise<Receipt> {
        const coffeesDto: CoffeeDto[] = [];
        let sum = 0;
        // get sum of cost and make array coffeesDto
        for (let i = 0; i < orders.length; i++) {
            const coffee = await configuration.coffeeService.getCoffeeByName(orders[i].name);
            const coffeeDto = convertCoffeeToCoffeeDto(coffee);
            coffeeDto.quantity = orders[i].count;
            sum += coffeeDto.quantity * coffeeDto.price;
            coffeesDto.push(coffeeDto);
        }

        const orderId  = uuidv4();
        const now = new Date();
        const date = now.toISOString().slice(0, 19).replace('T', ' ');


        try{
            await configuration.pool.query('INSERT INTO orders VALUES(?,?,?,?)',[orderId,login,date,sum] );
            for (let i = 0; i < coffeesDto.length; i++) {
                await configuration.pool.query('INSERT INTO order_items (orderId,orderName, quantity,cost)VALUES(?,?,?,?)',[orderId,coffeesDto[i].name,coffeesDto[i].quantity,coffeesDto[i].price] );
            }

        }catch(e){
            await this.doneOrder(orderId);
            throw new Error(JSON.stringify({status:404,message:'Bad Order'}));
        }

        //change quantity in coffee_products
        for (let i = 0; i < orders.length; i++) {
            await configuration.coffeeService.changeQuantity(orders[i].name,orders[i].count);
        }


        return Promise.resolve({
            orderId,
            nameUser :login,
            date,
            orders:coffeesDto,
            cost : sum,
        });
    }
}