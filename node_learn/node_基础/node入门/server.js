/**
 * Created by chenxingyu on 2017/5/4.
 */
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

            route(handle, pathname, response, request);

        // var postData = "";

        // request.setEncoding("utf8");

        // request.addListener("data", function(postDataChunk) {
            // postData += postDataChunk;
            // console.log("Received POST data chunk '"+ postDataChunk + "'.");
        // });

        // request.addListener("end", function() {
        // });
    }




    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;