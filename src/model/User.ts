import {Receipt, Roles} from "../utils/types";


export type User = {
    login: string;
    hashPassword: string;
    email: string;
    birthday: Date;
    role:Roles;
}
