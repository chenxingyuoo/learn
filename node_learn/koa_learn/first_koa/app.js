/**
 * Created on 2017/6/1.
 */

'use strict';

var koa = require('koa');
var app = new koa();

debugger;

// x-response-time

app.use(function *(next){
    var start = new Date;
    console.log('x-response-time1');
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log('x-response-time2');

    console.log(this.get('Date'));

    this.type = 'text/html; charset=utf-8';
    console.log(this.type);

    this.status = 301;

    this.redirect('/login');

    this.body = 'login';
});

// logger

app.use(function *(next){
    var start = new Date;
    console.log('logger1');

    yield next;
    var ms = new Date - start;
    console.log('logger2');
    console.log('%s %s - %s', this.method, this.url, ms);
});

// app.use(function *(next){
//     console.log('cookies set');
//     this.cookies.set('name', 'tobi', { signed: true });
//     yield next;
// });

// response

app.use(function *(){
    console.log('body');
    this.body = 'Hello World';


});




app.on('error', function(err, ctx){
    console.error('server error', err, ctx);
});

app.listen(3000);