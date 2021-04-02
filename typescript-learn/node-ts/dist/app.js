"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Koa from 'koa'
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_static_1 = __importDefault(require("koa-static"));
var app = routing_controllers_1.createKoaServer({
    controllers: [__dirname + "/controllers/*{.js,.ts}"],
});
app.use(koa_static_1.default(__dirname + "/publich"));
app.use(koa_bodyparser_1.default());
exports.default = app;
