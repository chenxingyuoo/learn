/**
 * Created by chenxingyu on 2016/12/14.
 */
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<h4>Hello World</h4>');
}).listen(3000);

console.log("HTTP server is listening at port 3000.");