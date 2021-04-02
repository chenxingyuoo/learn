"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = 3000;
exports.default = app_1.default.listen(port, function () { return console.log("Server run as http://127.0.0.1:" + port); });
process.on('uncaughtException', console.error);
