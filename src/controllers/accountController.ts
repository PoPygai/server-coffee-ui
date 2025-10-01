import {UserDto} from "../model/UserDto";
import {convertUserDtoToUser} from "../utils/tools";
import {configuration} from "../config/config";


export class accountController {

    async getAccountByLogin(login: string) {
        return  await configuration.accService.getAccountByLogin(login);
    }

    async addAccount(value: UserDto) {
        const user = convertUserDtoToUser(value);
        await configuration.accService.addAccount(user);
        return value;
    }

    async updateAccount(value: UserDto) {
        await  configuration.accService.updateAccount(value);
        return value;
    }

    async deleteAccount(login:string) {
        await configuration.accService.deleteAccount(login);
    }

    async singIn(login: string, password: string) {
        return  await configuration.accService.signIn(login, password);
    }
}