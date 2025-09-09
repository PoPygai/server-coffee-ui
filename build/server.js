"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServer = void 0;
const express_1 = __importDefault(require("express"));
const launchServer = () => {
    const app = (0, express_1.default)();
    app.listen("3033", () => {
        console.log(`server starts at http://localhost:3033`);
    });
};
exports.launchServer = launchServer;
