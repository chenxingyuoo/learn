/**
 * Created by chenxingyu on 2017/5/5.
 */
var fs = require('fs');
var http = require('http');
var BufferHelper = require('./bufferHelper');



function a(){
    var rs = fs.createReadStream('testdata.md');
    var data = '';
    rs.on("data", function (trunk){
        data += trunk;
    });
    rs.on("end", function () {
        console.log(data);
    });
}

a();



function t(){
    var rs = fs.createReadStream('testdata1.md', {encoding: 'utf-8', bufferSize: 11});
    var data = '';
    rs.on("data", function (trunk){
        data += trunk;
    });
    rs.on("end", function () {
        console.log(data);
    });
}

t()


//有趣的string_decoder

console.log("事件循环和请求对象".length); //9

console.log(new Buffer("事件循环和请求对象").length);  //27

http.get('http://127.0.0.1:8080/index.html', function (res) {
    // var data = "";
    // res.on('data', function (chunk) {
    //     console.log(chunk,'chunk');
    //     data += chunk;
    // })
    // .on("end", function () {
    //     //对data转码
    //     console.log(data, 'data');
    // });

    var chunks = [];
    var size = 0;
    res.on('data', function (chunk) {
        console.log(chunk, 'chunk');
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on('end', function () {
        var data = null;
        switch(chunks.length) {
            case 0:
                data = new Buffer(0);
                break;
            case 1:
                data = chunks[0];
                break;
            default:
                data = new Buffer(size);
                for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
                    var chunk = chunks[i];
                    chunk.copy(data, pos);
                    pos += chunk.length;
                }
                break;
        }
        console.log(data, 'data');
    });

});


http.createServer(function (req, res) {
    http.get('http://127.0.0.1:8080/index.html', (request) => {
        var bufferHelper = new BufferHelper();
        bufferHelper.load(request, function (err, buffer) {
            var html = buffer.toString();

            console.log(html);

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    });
}).listen(8088, "localhost");

