import {UserDto} from "../model/UserDto";
import {convertUserDtoToUser} from "../utils/tools";
import {configuration} from "../config/config";
import {Roles} from "../utils/types";


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
        const result = await configuration.accService.updateAccount(value);
        if(result)
            return value;
        throw new Error(JSON.stringify({status:403 ,message:"No user found"}));
    }

    async deleteAccount(login:string) {
        await configuration.accService.deleteAccount(login);
    }

    async singIn(login: string, password: string) {
        return  await configuration.accService.signIn(login, password);
    }

    async changeRoleAccount(body:{login:string, role:Roles},userRole:Roles) {
        await configuration.accService.changeRoleAccount(body,userRole);
    }
}