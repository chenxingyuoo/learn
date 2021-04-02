/**
 * Created by mac on 15/11/22.
 */
/*var http = require('http');

 http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Hello World\n Nice');
 }).listen(1337, '127.0.0.1');

 console.log('Server running at http://127.0.0.1:1337/');*/


//2.
/*var http = require('http');

 function onRequest(require , respones){
 respones.writeHead(200 , {'Content-Type': 'text/plain'});
 respones.end('Hello World \n Nice day!')
 }

 http.createServer(onRequest).listen(1337, '127.0.0.1');

 console.log('Server running at http://127.0.0.1:1337/');*/


/*var http = require("http");
 var url = require("url");

 function start() {
 function onRequest(request, response) {
 var pathname = url.parse(request.url).pathname;
 console.log("Request for " + pathname + " received.");
 response.writeHead(200, {"Content-Type": "text/plain"});
 response.write("Hello World");
 response.end();
 }

 http.createServer(onRequest).listen(8888,'127.0.0.1');
 console.log("Server has started.");
 }

 exports.start = start;*/

//扩展start函数 ，与router 整合
/*var http = require("http");
 var url = require("url");

 function start(route) {
 function onRequest(request, response) {
 var pathname = url.parse(request.url).pathname;
 console.log("Request for " + pathname + " received.");

 route(pathname);

 response.writeHead(200, {"Content-Type": "text/plain"});
 response.write("Hello World");
 response.end();
 }

 http.createServer(onRequest).listen(8888);
 console.log("Server has started.");
 }

 exports.start = start;*/
/*
 var http = require("http");
 var url = require("url");

 function start(route) {
 function onRequest(request, response) {
 var pathname = url.parse(request.url).pathname;
 console.log("Request for " + pathname + " received.");

 route(pathname);

 response.writeHead(200, {"Content-Type": "text/plain"});
 response.write("Hello World");
 response.end();
 }

 http.createServer(onRequest).listen(8888);
 }
 console.log("Server has started.");

 exports.start = start;
 */



//请求

/*  get 请求
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);*/


//post 请求
var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req, res){
 var post = '';     //定义了一个post变量，用于暂存请求体的信息

 req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  post += chunk;
 });

 req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  post = querystring.parse(post);
  res.end(util.inspect(post));
 });
}).listen(3000);