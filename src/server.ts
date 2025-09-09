import express from 'express'
import {configuration} from "./config/config";
import dotenv from "dotenv";


export const launchServer = ()=>{
    //================load environments==================
    dotenv.config();
    //=============Server================================
    const app = express();
    app.listen(configuration.port, () => {
        console.log(`server starts at http://localhost:${configuration.port}` );
    })


}