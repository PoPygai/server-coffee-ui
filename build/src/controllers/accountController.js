"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const tools_1 = require("../utils/tools");
const AccountServiceImpl_1 = require("../services/AccountServiceImpl");
class accountController {
    constructor() {
        this.service = new AccountServiceImpl_1.AccountServiceImpl();
    }
    async getAccountByLogin(login) {
    }
    async addAccount(value) {
        const user = (0, tools_1.convertUserDtoToUser)(value);
        await this.service.addAccount(user);
        return value;
    }
    async updateAccount(value) {
    }
    async deleteAccount(login) {
    }
}
exports.accountController = accountController;
