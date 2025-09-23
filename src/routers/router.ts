import express from "express";
import asyncHandler from "express-async-handler";
import {controllerProductCoffee} from "../controllers/ProductCoffee";
import {CoffeeDto} from "../model/CoffeeDto";
import {schemaBody} from "../utils/joiSchemas";

const controller = new controllerProductCoffee();

export const router = express.Router();

router.get('/coffee-product/:name', asyncHandler(async(req,res)=> {
    const name = req.params.name;
    if(!name) throw new Error(JSON.stringify({status:400,message:'Empty name of coffee'}));

    const result :CoffeeDto = await controller.getCoffeeByName(name);
    res.status(200).json(result);
}));
router.get('/coffee-products', asyncHandler(async(req, res)=>{
    const result = await controller.getAllCoffees();
    res.status(200).json(result);
}));
//todo
router.get('/coffee-product/quantity/:name', asyncHandler(async(req, res)=>{
    const name = req.params.name;
    if(!name) throw new Error(JSON.stringify({status:400,message:'Bad name'}));

    const result = await controller.quantityCoffeeByName(name);
    res.status(200).json(res);
}));
router.delete('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id = req.params.id;

    if(!id) throw new Error(JSON.stringify({status:400,message:'Bad Id'}));


    const result =  await controller.removeCoffee(id);
    res.status(200).json(result);
}));
router.put('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id  = req.params.id;
    if (!id) throw new Error(JSON.stringify({status:400,message:'Bad id'}));
    const {error,value}= schemaBody.validate(req.body);
    if(error) {
        throw new Error(JSON.stringify({status:400,message:error.message}))

    }

    const result = await controller.changeCoffee(id,value);
    res.status(200).json(result);
}));
router.post('/coffee-product', asyncHandler(async(req, res)=>{
    const {error,value} = schemaBody.validate(req.body);
    if(error) throw new Error(JSON.stringify({status:400,message:error.message}));
    const result = await controller.addCoffee(value);
    res.status(200).json(result);
}));
