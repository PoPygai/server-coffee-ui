import {AccountService} from "./AccountServices";
import {User} from "../model/User";
import {configuration} from "../config/config";
import {UserDto} from "../model/UserDto";

export class AccountServiceImpl implements AccountService {
    async addAccount(account: User): Promise<void> {
        try{
            await  configuration.poolAccounts.query("INSERT INTO accounts VALUES(?,?,?,?,?)",[account.login,account.hashPassword,account.email,account.birthday,account.role]);
        }catch(e){
            let er =e as Error;
            throw  new Error(JSON.stringify({status: 400,message:er.message}));
        }
    }

    async deleteAccount(login: string): Promise<void> {
        await configuration.poolAccounts.query("DELETE FROM accounts WHERE login=?", [login]);
    }

    async getAccountByLogin(login: string): Promise<User> {
        const [result] = await configuration.poolAccounts.query("SELECT * FROM accounts WHERE login=?", [login]);
        return Promise.resolve((result as User[])[0]);
    }

    async updateAccount(account: UserDto): Promise<void> {
        await configuration.poolAccounts.query("UPDATE accounts SET login=?,email=?,birthday=? WHERE login=?",[account.login,account.email,account.birthday,account.login]);
    }

}