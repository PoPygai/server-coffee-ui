import {Router} from "express";
import {accountController} from "../controllers/accountController";
import asyncHandler from "express-async-handler";
import {userAccountSchema} from "../model/UserDto";


export const accountRouter = Router();

const controller = new accountController();


accountRouter.get('/account/:login', asyncHandler(async (req,res)=>{
    const login = req.params.login
    if(!login) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    const result  = await controller.getAccountByLogin(login);
    res.status(200).json(result);

} ));
accountRouter.post('/account', asyncHandler(async (req,res)=>{
    const {error,value} = userAccountSchema.validate(req.body);
    if(error) throw new Error(JSON.stringify({status:400,message:error.message}));

    const result = await controller.addAccount(value);
    res.status(200).json(result);

}))
accountRouter.put('/account', asyncHandler(async (req,res)=>{
    const {error,value} = userAccountSchema.validate(req.body);
    if(error) throw new Error(JSON.stringify({status:400,message:error.message}));
    const result = await controller.updateAccount(value);
    res.status(200).json(result);
}))
accountRouter.delete('/account/:login', asyncHandler(async (req,res)=>{
    const login = req.params.login;
    if(!login) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    await controller.deleteAccount(login);
    res.status(200).json({status:200,message:'Account Deleted'});
}))
