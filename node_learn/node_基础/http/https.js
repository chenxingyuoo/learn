/**
 * Created by chenxingyu on 2016/11/10.
 */
var https = require('https')
var fs = require('fs')

var option = {
    key : fs.readFileSync('ssh_key.pem'),
    cret : fs.readFileSync('ssh_cret.pem'),
};

https.createServer(option , function (req, res){
    res.writeHead(200);
    res.end('hello world')
}).listen(8090);