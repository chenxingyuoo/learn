/**
 * Created on 2017/6/2.
 */

'use strict';
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();


// logger
app.use(function *(next){
    var start = new Date;
    console.log('logger1');

    yield next;
    var ms = new Date - start;
    console.log('logger2');
    console.log('%s %s - %s', this.method, this.url, ms);
});

// 对于任何请求，app将调用该异步函数处理请求：
app.use(function* (next) {
    yield next;
    this.type = 'text/html';
    this.body = '<h1>Hello, koa2!</h1>';
});


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');