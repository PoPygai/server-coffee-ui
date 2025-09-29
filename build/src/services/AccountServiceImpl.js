"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountServiceImpl = void 0;
class AccountServiceImpl {
    getAccountByLogin(login) {
        throw new Error("Method not implemented.");
    }
    addAccount(user) {
        throw new Error("Method not implemented.");
    }
    deleteAccount(login) {
        throw new Error("Method not implemented.");
    }
    updateAccount(userDto) {
        throw new Error("Method not implemented.");
    }
}
exports.AccountServiceImpl = AccountServiceImpl;
// async addAccount(account: User): Promise<void> {
//     try{
//         await  configuration.poolAccounts.query("INSERT INTO accounts VALUES(?,?,?,?,?)",[account.login,account.hashPassword,account.email,account.birthday,account.role]);
//     }catch(e){
//         let er =e as Error;
//         throw  new Error(JSON.stringify({status: 400,message:er.message}));
//     }
// }
//
// async deleteAccount(login: string): Promise<void> {
//     await configuration.poolAccounts.query("DELETE FROM accounts WHERE login=?", [login]);
// }
//
// async getAccountByLogin(login: string): Promise<User> {
//     const [result] = await configuration.poolAccounts.query("SELECT * FROM accounts WHERE login=?", [login]);
//     return result as User;
// }
//
// async updateAccount(account: any): Promise<void> {
//     return Promise.resolve(undefined);
// }
