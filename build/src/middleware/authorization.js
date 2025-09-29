"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const tools_1 = require("../utils/tools");
const config_1 = require("../config/config");
const authorization = async (req, res, next) => {
    const request = req.method + (0, tools_1.normalizePath)(req.path);
    if (config_1.configuration.skipPath.some((path) => path.includes(request)))
        return next();
    if (req.role && config_1.configuration.pathsRoles[request].some(role => role === req.role))
        return next();
    next(JSON.stringify({ status: 403, statusText: "You dont have rights" }));
};
exports.authorization = authorization;
