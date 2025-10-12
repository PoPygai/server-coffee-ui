"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const tools_1 = require("./tools");
const joiSchemas_1 = require("./joiSchemas");
const validateBody = (req, res, next) => {
    if (req.body) {
        const endpoint = req.method + (0, tools_1.normalizePath)(req.path);
        const schema = joiSchemas_1.joiSchemas[endpoint];
        if (!schema)
            throw new Error(JSON.stringify({ status: 500, message: 'Validation schema not found' }));
        const { error } = schema.validate(req.body);
        if (error)
            throw new Error(JSON.stringify({ status: 400, message: error.message }));
    }
    next();
};
exports.validateBody = validateBody;
