import express from "express";
import asyncHandler from "express-async-handler";

const controller = 0;

export const router = express.Router();

router.get('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(400).json({error:"id is required"});
    }

    const res =  await controller.getCoffeeById(id);
    res.status(200).json(res);
}));
router.get('/coffee-products', asyncHandler(async(req, res)=>{
    const res = await controller.getAllCoffees();
    res.status(200).json(res);
}));
router.get('/coffee-product/:name', asyncHandler(async(req, res)=>{
    const name = req.params.name;

    if(!name){
        res.status(400).json({error:"name is required"});
    }

    const res = await controller.countCoffeeByName(name);
    res.status(200).json(res);
}));
router.delete('/coffee-product/:id', asyncHandler(async(req, res)=>{
    const id = req.params.id;

    if(!id){
        res.status(400).json({error:"id is required"});
    }

    const res =  await controller.removeCoffee(id);
    res.status(200).json(res);
}));
router.put('/coffee-product', asyncHandler(async(req, res)=>{
    const { name, id } = req.query;

    if(!id || !name){
        res.status(400).json({error:"all paraments are required"});
    }
    const res = await controller.changeCoffee(id);
    res.status(200).json(res);
}));
router.post('/coffee-product', asyncHandler(async(req, res)=>{
    const body = req.body;

    const res = await controller.changeCoffee(body);
    res.status(200).json(res);
}));