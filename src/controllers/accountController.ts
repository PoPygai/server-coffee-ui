import {UserDto} from "../model/UserDto";
import {convertUserDtoToUser} from "../utils/tools";
import {AccountService} from "../services/AccountServices";
import {AccountServiceImpl} from "../services/AccountServiceImpl";


export class accountController {

    private service : AccountService = new AccountServiceImpl();

    async getAccountByLogin(login: string) {

    }

    async addAccount(value: UserDto) {
        const user = convertUserDtoToUser(value);
        await this.service.addAccount(user);
        return value;
    }

    async updateAccount(value: UserDto) {

    }

    async deleteAccount(login:string) {

    }
}