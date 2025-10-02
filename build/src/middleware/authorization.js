"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const tools_1 = require("../utils/tools");
const config_1 = require("../config/config");
const authorization = (req, res, next) => {
    const request = req.method + (0, tools_1.normalizePath)(req.path);
    console.log(request);
    if (config_1.configuration.skipPath.some((path) => path.includes(request)))
        return next();
    if (req.role && config_1.configuration.pathsRoles[request].some(role => role === req.role))
        return next();
    next({ message: JSON.stringify({ status: 403, message: "You dont have rights" }) });
};
exports.authorization = authorization;
