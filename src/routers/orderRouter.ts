import express from "express";
import asyncHandler from "express-async-handler";
import {AuthRequest} from "../utils/types";
import {orderController} from "../controllers/orderController";
import {idSchema} from "../utils/joiSchemas";


export const orderRouter = express.Router();
const controller = new orderController();

orderRouter.post('/order', asyncHandler(async(req:AuthRequest, res)=>{
    const result = await controller.order(req.login!,req.body);
    res.json(result);
}))
orderRouter.get('/order/:id', asyncHandler(async(req:AuthRequest, res)=>{
    const {error} = idSchema.validate(req.params.id);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad id'}))


    const result = await controller.getOrder(req.params.id);
    res.json(result);
}))
orderRouter.delete('/order/:id', asyncHandler(async(req:AuthRequest, res)=>{
    const {error} = idSchema.validate(req.params.id);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad id'}))


    const result = await controller.deleteOrder(req.params.id);
    res.json(result);
}))
