"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const tools_1 = require("../utils/tools");
const config_1 = require("../config/config");
class accountController {
    async getAccountByLogin(login) {
        return await config_1.configuration.accService.getAccountByLogin(login);
    }
    async addAccount(value) {
        const user = (0, tools_1.convertUserDtoToUser)(value);
        await config_1.configuration.accService.addAccount(user);
        return value;
    }
    async updateAccount(value) {
        await config_1.configuration.accService.updateAccount(value);
        return value;
    }
    async deleteAccount(login) {
        await config_1.configuration.accService.deleteAccount(login);
    }
}
exports.accountController = accountController;
