/**
 * Created by mac on 16/6/30.
 */
var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        //爬数据
        res.on('data', function (chunk) {
            data += chunk;
        });
        //爬数据结束 ， 执行 callback
        res.on("end", function() {
            callback(data);
        });

    }).on("error", function() {
        callback(null);
    });
}

module.exports = download;