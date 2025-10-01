import {Router} from "express";
import {accountController} from "../controllers/accountController";
import asyncHandler from "express-async-handler";


export const accountRouter = Router();

const controller = new accountController();


accountRouter.get('/account/:login', asyncHandler(async (req,res)=>{
    const login = req.params.login
    if(!login) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    const result  = await controller.getAccountByLogin(login);
    res.status(200).json(result);

} ));
accountRouter.post('/account', asyncHandler(async (req,res)=>{
    const result = await controller.addAccount(req.body);
    res.status(200).json(result);

}))
accountRouter.put('/account', asyncHandler(async (req,res)=>{
    const result = await controller.updateAccount(req.body);
    res.status(200).json(result);
}))
accountRouter.delete('/account/:login', asyncHandler(async (req,res)=>{
    const login = req.params.login;
    if(!login) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    await controller.deleteAccount(login);
    res.status(200).json({status:200,message:'Account Deleted'});
}))
accountRouter.get('/signin', asyncHandler(async (req,res)=>{
    const login = req.query.login as string;
    const password = req.query.password as string;
    //todo
    if (!login|| !password) {
        res.status(400).json({ message: "Login and password required" });
        return
    }
    const result  = await controller.singIn(login, password);
    res.status(200).json(result);
}))
