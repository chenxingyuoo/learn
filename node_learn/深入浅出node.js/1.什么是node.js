

//Node.js采用事件驱动、异步编程，为网络服务而设计

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(8080, "localhost");


// 用于请求的选项
var options = {
    host: 'localhost',
    port: '8080',
    path: '/index.htm'
};


var hostRequest = http.request(options,function(response) {
    var responseHTML ='';
    response.on('data', function (chunk) {
        responseHTML = responseHTML + chunk;
    });
    response.on('end',function(){
        console.log(responseHTML);
        // do something useful
    });
});

hostRequest.end();

