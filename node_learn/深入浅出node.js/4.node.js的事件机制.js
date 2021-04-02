/**
 * Created by chenxingyu on 2017/5/5.
 */

//基于V8引擎实现的事件驱动IO

//事件机制的实现

//Node.js中大部分的模块，都继承自Event模块

//Event模块（events.EventEmitter）是一个简单的事件监听器模式的实现。具有addListener/on，once，removeListener，removeAllListeners，emit等基本的事件监听模式的方法实现。

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8080, "localhost");

var options = {
    host: 'localhost',
    port: 8080,
    path: '/upload',
    method: 'POST'
};
var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
// write data to request body
req.write('data\n');
req.write('data\n');
req.end();


var util = require('util');

//继承event.EventEmitter
var events = require('events');
function Stream() {
    events.EventEmitter.call(this);
}

util.inherits(Stream, events.EventEmitter);

var s = new Stream();
console.log(s.prototype);

s.on('some_event', function() {
    console.log('some_event 事件触发');
});

s.emit('some_event');