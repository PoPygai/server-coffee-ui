import {Router} from "express";
import {accountController} from "../controllers/accountController";
import asyncHandler from "express-async-handler";
import {AuthRequest} from "../utils/types";
import {accountLoginPasswordSchema, loginSchema} from "../utils/joiSchemas";


export const accountRouter = Router();

const controller = new accountController();


accountRouter.get('/account/:login', asyncHandler(async (req,res)=>{
    const {error} = loginSchema.validate(req.params.login);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    const result  = await controller.getAccountByLogin(req.params.login);
    res.json(result);
} ));
accountRouter.post('/account', asyncHandler(async (req,res)=>{
    const result = await controller.addAccount(req.body);
    res.json(result);

}))
accountRouter.put('/account', asyncHandler(async (req,res)=>{
    const result = await controller.updateAccount(req.body);
    res.json(result);
}))
accountRouter.delete('/account/:login', asyncHandler(async (req,res)=>{
    const {error} = loginSchema.validate(req.params.login);
    if(error) throw new Error(JSON.stringify({status:400,message:'Bad Login'}));
    await controller.deleteAccount(req.params.login);
    res.json('Account Deleted');
}))
accountRouter.get('/signin', asyncHandler(async (req,res)=>{
    const login = req.query.login as string;
    const password = req.query.password as string;
    const {error} = accountLoginPasswordSchema.validate({login, password});
    if (error)
        throw new Error(JSON.stringify({status:400, message: "Login and password required" }))

    const result  = await controller.singIn(login, password);
    res.json(result);
}))
accountRouter.patch('/account', asyncHandler(async (req:AuthRequest,res)=>{
    await controller.changeRoleAccount(req.body,req.role!);
    res.json('Role Updated');
}))