import express from "express";
import asyncHandler from "express-async-handler";
import {AuthRequest} from "../utils/types";
import {orderController} from "../controllers/orderController";


export const orderRouter = express.Router();
const controller = new orderController();

orderRouter.post('/order', asyncHandler(async(req:AuthRequest, res)=>{
    const result = await controller.order(req.login!,req.body);
    res.status(200).json(result);
}))
orderRouter.get('/order/:id', asyncHandler(async(req:AuthRequest, res)=>{
    const id = req.params.id;
    if(!id) throw new Error(JSON.stringify({status:403,message:'bad id'}))
    const result = await controller.getOrder(id);
    res.status(200).json(result);
}))
orderRouter.delete('/order/:id', asyncHandler(async(req:AuthRequest, res)=>{
    const id = req.params.id;
    if(!id) throw new Error(JSON.stringify({status:403,message:'bad id'}))
    const result = await controller.deleteOrder(id);
    res.status(200).json(result);
}))
