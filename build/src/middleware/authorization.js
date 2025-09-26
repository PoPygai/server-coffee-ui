"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const authorization = async (req, res, next) => {
    const request = req.method + req.path;
    console.log(request);
    //todo
    const skipPath = ["POST/account"];
    if (skipPath.some((path) => path.includes(request))) {
        return next();
    }
    if (req.role !== undefined && req.login !== undefined) {
    }
    next(JSON.stringify({ status: 403, statusText: "You dont have rights" }));
};
exports.authorization = authorization;
const skipPath = ["POST/account", "POST/account1", "POST/account2"];
console.log();
