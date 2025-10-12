import {AccountService} from "./AccountServices";
import {User} from "../model/User";
import {configuration} from "../config/config";
import {UserDto} from "../model/UserDto";
import bcrypt from "bcryptjs";
import {getJWT} from "../utils/tools";
import {Roles, UserReturn} from "../utils/types";
import {ResultSetHeader} from "mysql2";

export class AccountServiceImpl implements AccountService {

    async changeRoleAccount(body: { login: string; role: Roles; }, userRole: Roles): Promise<void> {
        if(body.role === Roles.ROOT && userRole === Roles.ADMIN) throw new Error(JSON.stringify({status:403,message:"You dont have rights"}));
        await configuration.poolAccounts.query("UPDATE accounts SET role = ? WHERE login = ?", [body.role,body.login]);
    }
    async signIn(login: string, password: string): Promise<string> {
        const user = await configuration.accService.getAccountByLogin(login);
        if(!user) throw new Error(JSON.stringify({status:404 ,message:"No user found"}));
        if(!bcrypt.compareSync(password,user.hashPassword)) throw new Error(JSON.stringify({status:401, message: "Incorrect login or password"}))
        const token = getJWT(login, user.role)
        return Promise.resolve(token);
    }
    async addAccount(account: User): Promise<void> {
        try{
            await  configuration.poolAccounts.query("INSERT INTO accounts VALUES(?,?,?,?,?)",[account.login,account.hashPassword,account.email,account.birthday,account.role]);
        }catch(e){
            let er =e as Error;
            throw  new Error(JSON.stringify({status: 400,message:er.message}));
        }
    }
    async deleteAccount(login: string): Promise<void> {
        const [result] = await configuration.poolAccounts.query<UserReturn[]>("SELECT * FROM accounts WHERE login=?", [login]);
        if(!result[0])throw new Error(JSON.stringify({status:404 ,message:"No user found"}));

        await configuration.poolAccounts.query("DELETE FROM accounts WHERE login=?", [login]);

    }
    async getAccountByLogin(login: string): Promise<User> {
        const [result] = await configuration.poolAccounts.query<UserReturn[]>("SELECT * FROM accounts WHERE login=?", [login]);
        if(!result[0])throw new Error(JSON.stringify({status:404 ,message:"No user found"}));
        return Promise.resolve(result[0]);
    }

    async updateAccount(account: UserDto): Promise<boolean> {
        const [result] = await configuration.poolAccounts.query<ResultSetHeader>("UPDATE accounts SET login=?,email=?,birthday=? WHERE login=?",[account.login,account.email,account.birthday,account.login]);
        return Promise.resolve(result.changedRows > 0  );
    }

}