import express from "express";
import asyncHandler from "express-async-handler";
import {controllerProductCoffee} from "../controllers/productsCoffeeController";
import {CoffeeDto} from "../model/CoffeeDto";

const controller = new controllerProductCoffee();

export const productsCoffeeRouter = express.Router();

productsCoffeeRouter.get('/coffee-product/:name', asyncHandler(async(req, res)=> {
    const name = req.params.name;
    if(!name) throw new Error(JSON.stringify({status:400,message:'Empty name of coffee'}));

    const result :CoffeeDto = await controller.getCoffeeByName(name);
    res.status(200).json(result);
}));
productsCoffeeRouter.get('/coffee-products', asyncHandler(async(req, res)=>{
    const result = await controller.getAllCoffees();
    res.status(200).json(result);
}));

productsCoffeeRouter.get('/coffee-product/quantity/:name', asyncHandler(async(req, res)=>{
    const name = req.params.name;
    if(!name) throw new Error(JSON.stringify({status:400,message:'Bad name'}));

    const result = await controller.quantityCoffeeByName(name);
    res.status(200).json(result);
}));
productsCoffeeRouter.delete('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id = req.params.id;
    if(!id) throw new Error(JSON.stringify({status:400,message:'Bad Id'}));
    await controller.removeCoffee(id);
    res.status(200).json({status:200,message:'Coffee Deleted'});
}));
productsCoffeeRouter.put('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id  = req.params.id;
    if (!id) throw new Error(JSON.stringify({status:400,message:'Bad id'}));

    const result = await controller.changeCoffee(id,req.body);
    res.status(200).json(result);
}));
productsCoffeeRouter.post('/coffee-product', asyncHandler(async(req, res)=>{
    const result = await controller.addCoffee(req.body);
    res.status(200).json(result);
}));
