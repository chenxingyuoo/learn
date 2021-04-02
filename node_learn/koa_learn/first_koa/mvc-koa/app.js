/**
 * Created on 2017/6/2.
 */

'use strict';

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

// 导入controller middleware:
const controller = require('./middleware/controllers');

const staticFiles = require('./middleware/static-files');

const templating = require('./middleware/templating');

const isProduction = process.env.NODE_ENV === 'production';

// 创建一个Koa对象表示web app本身:
const app = new Koa();


// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.use(bodyParser());

app.use(staticFiles('/static/', __dirname + '/static'));

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//添加路由中间件
app.use(controller());

app.listen(3001);
console.log('app started alst port 3000...');