"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccountSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userAccountSchema = joi_1.default.object({
    login: joi_1.default.string().max(30).required(),
    password: joi_1.default.string().min(8).required(),
    email: joi_1.default.string().email().required(),
    birthday: joi_1.default.string().length(10).required(),
});
