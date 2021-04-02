/**
 * Created on 2017/6/2.
 */

'use strict';


const fs = require('fs');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

// 导入controller middleware:
const controller = require('./middleware/controllers');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(bodyParser());

//添加路由中间件
app.use(controller());

app.listen(3000);
console.log('app started alst port 3000...');