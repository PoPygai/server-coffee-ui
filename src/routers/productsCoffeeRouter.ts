import express from "express";
import asyncHandler from "express-async-handler";
import {controllerProductCoffee} from "../controllers/productsCoffeeController";
import {CoffeeDto} from "../model/CoffeeDto";
import {AuthRequest} from "../utils/types";
import {idSchema, nameSchema} from "../utils/joiSchemas";

const controller = new controllerProductCoffee();

export const productsCoffeeRouter = express.Router();

productsCoffeeRouter.get('/coffee-product/:name', asyncHandler(async(req, res)=> {
    const {error} = nameSchema.validate(req.params.name);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad name'}));

    const result :CoffeeDto = await controller.getCoffeeByName(req.params.name);
    res.json(result);
}));
productsCoffeeRouter.get('/coffee-products', asyncHandler(async(req, res)=>{
    const result = await controller.getAllCoffees();
    res.json(result);
}));

productsCoffeeRouter.get('/coffee-product/quantity/:name', asyncHandler(async(req, res)=>{
    const {error} = nameSchema.validate(req.params.name);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad name'}));

    const result = await controller.quantityCoffeeByName(req.params.name);
    res.json(result);
}));
productsCoffeeRouter.delete('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const {error} = idSchema.validate(req.params.id);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad id'}))

    await controller.removeCoffee(req.params.id);
    res.json('Coffee Deleted');
}));
productsCoffeeRouter.put('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const {error} = idSchema.validate(req.params.id);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad id'}))

    const result = await controller.changeCoffee(req.params.id,req.body);
    res.json(result);
}));
productsCoffeeRouter.post('/coffee-product', asyncHandler(async(req, res)=>{
    const result = await controller.addCoffee(req.body);
    res.json(result);
}));

