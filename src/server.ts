import express from 'express'
import {configuration} from "./config/config";
import {productsCoffeeRouter} from "./routers/productsCoffeeRouter";
import {createWriteStream} from "node:fs";
import morgan from "morgan";
import {errorHandler} from "./errorHandler/errorHandler";
import {accountRouter} from "./routers/accountRouter";
import {authentication} from "./middleware/authentication";
import {authorization} from "./middleware/authorization";
import {validate} from './utils/validate'

export const launchServer = ()=>{

    //=============Server================================
    const logStream = createWriteStream("./logs.log")

    const app = express();
    app.listen(configuration.port, () => {
        console.log(`server starts at http://localhost:${configuration.port}` );
    })
    //============================Middleware================
    app.use(morgan('dev'));
    app.use(morgan('combined', {stream: logStream}));
    app.use(express.json());

    app.use(authentication)
    app.use(authorization)
    app.use(validate)
    //=====================Router=======================
    app.use('/accounts/', accountRouter)
    app.use('/',productsCoffeeRouter);

    //====================errorHandling============
    app.use(errorHandler)


}