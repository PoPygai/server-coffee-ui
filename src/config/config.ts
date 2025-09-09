import dotenv from "dotenv";

export interface AppConfig {
    port: number;
}

dotenv.config();
export const configuration:AppConfig = {
    port : Number(process.env.PORT),
}
