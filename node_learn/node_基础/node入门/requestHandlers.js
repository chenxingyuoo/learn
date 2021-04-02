/**
 * Created by chenxingyu on 2017/5/4.
 */
var exec = require("child_process").exec;
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var formidable = require("formidable");
console.log(formidable);

function start(response) {
    console.log("Request handler 'start' was called.");
    // function sleep(milliSeconds) {
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    // }
    //
    // sleep(10000);


    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="text" name="name"><br>' +
        '<input type="file" name="upload"><br>' +
        '<input type="submit" value="Submit" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();


    // var content = "tttestttttt";
    //
    // response.write(content);
    //
    // exec("find /", { timeout: 10000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
    //     response.write(stdout);
    //     response.end();
    // });


}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");


    var form = new formidable.IncomingForm();

    form.uploadDir = "tmp"

    // console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        console.log(fields,'fields');
        console.log(files,'files');

//         var filePath = files.upload.path;
//         var originalFilename = files.upload.name;

//         fs.readFile(filePath , function(err, data) {
//              var timestamp = Date.now();
//              var type = files.upload.type.split('/')[1];
//              var poster = timestamp + '.' + type;

//               //生成一个新的路径
//             var newPath = path.join(__dirname, './', '/public/upload/' + poster);

// console.log(data);
//             fs.writeFile(newPath, data, function(err) {
//             })
//         })
//         
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });




}

function show(response,request) {
    console.log("Request handler 'show' was called.");

// console.log(request); 

    request.addListener("data", function(postDataChunk) {
        console.log(postDataChunk); 
            // postData += postDataChunk;
            // console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });
    request.addListener("end", function() {

    })

    fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;