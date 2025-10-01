"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountServiceImpl = void 0;
const config_1 = require("../config/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tools_1 = require("../utils/tools");
class AccountServiceImpl {
    async signIn(login, password) {
        const user = await config_1.configuration.accService.getAccountByLogin(login);
        if (!user)
            throw new Error(JSON.stringify({ status: 404, message: "No user found" }));
        if (!bcryptjs_1.default.compareSync(password, user.hashPassword))
            throw new Error(JSON.stringify({ status: 401, message: "Incorrect login or password" }));
        const token = (0, tools_1.getJWT)(login, user.role);
        return Promise.resolve(token);
    }
    async addAccount(account) {
        try {
            await config_1.configuration.poolAccounts.query("INSERT INTO accounts VALUES(?,?,?,?,?)", [account.login, account.hashPassword, account.email, account.birthday, account.role]);
        }
        catch (e) {
            let er = e;
            throw new Error(JSON.stringify({ status: 400, message: er.message }));
        }
    }
    async deleteAccount(login) {
        await config_1.configuration.poolAccounts.query("DELETE FROM accounts WHERE login=?", [login]);
    }
    async getAccountByLogin(login) {
        const [result] = await config_1.configuration.poolAccounts.query("SELECT * FROM accounts WHERE login=?", [login]);
        return Promise.resolve(result[0]);
    }
    async updateAccount(account) {
        await config_1.configuration.poolAccounts.query("UPDATE accounts SET login=?,email=?,birthday=? WHERE login=?", [account.login, account.email, account.birthday, account.login]);
    }
}
exports.AccountServiceImpl = AccountServiceImpl;
