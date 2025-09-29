"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    try {
        console.log(err.message);
        const error = JSON.parse(err.message);
        res.status(error.status).end(error.message);
    }
    catch (e) {
        res.status(500).end(`Unknown server error : ${err.message}`);
    }
};
exports.errorHandler = errorHandler;
