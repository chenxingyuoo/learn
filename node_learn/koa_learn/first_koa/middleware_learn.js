/**
 * Created on 2017/6/2.
 */

'use strict';

const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();


app.use(function* (next)  {
    console.log(`${this.request.method} ${this.request.url}`); // 打印URL
    yield next; // 调用下一个middleware
});

app.use(function* (next)  {
    const start = new Date().getTime(); // 当前时间
    yield next; // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(function* (next)  {
    yield next;
    this.type = 'text/html';
    // this.body = '<h1>Hello, koa2!</h1>';
});

app.use(function* (next)  {
    if (this.request.path === '/') {
        this.body = 'index page';
    } else {
        yield next;
    }
});

app.use(function* (next)  {
    if (this.request.path === '/test') {
        this.body = 'test page';
    } else {
        yield next;
    }
});

app.use(function* (next)  {
    if (this.request.path === '/error') {
        this.body = 'error page';
    } else {
        yield next;
    }
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');