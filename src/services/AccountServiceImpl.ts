import {AccountService} from "./AccountServices";
import {User} from "../model/User";

export class AccountServiceImpl implements AccountService {
    addAccount(account: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    deleteAccount(account: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    getAccountByLogin(login: string): Promise<User> {
        // return Promise.resolve(undefined);
        throw new Error("Method not implemented.");
    }

    updateAccount(account: any): Promise<void> {
        return Promise.resolve(undefined);
    }

}