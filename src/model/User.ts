import {Roles} from "../utils/types";


export type User = {
    login: string;
    hashPassword: string;
    email: string;
    birthday: string;
    role:Roles
}
