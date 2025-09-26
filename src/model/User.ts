import {Roles} from "../utils/types";


export type User = {
    id: string;
    hashPassword: string;
    email: string;
    birthday: string;
    role:Roles
}
