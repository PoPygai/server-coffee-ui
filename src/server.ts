import express from 'express'
import {configuration} from "./config/config";
import {router} from "./routers/router";
import {createWriteStream} from "node:fs";
import morgan from "morgan";
import {errorHandler} from "./errorHandler/errorHandler";

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
    //=====================Router=======================
    app.use('/',router);

    //====================errorHandling============
    app.use(errorHandler)


}