import {User} from "../model/User";
import {UserDto} from "../model/UserDto";


export interface AccountService {
    getAccountByLogin(login:string): Promise<User>;
    addAccount(user:User): Promise<void>;
    deleteAccount(id:string): Promise<void>;
    updateAccount(userDto:UserDto): Promise<void>;
}