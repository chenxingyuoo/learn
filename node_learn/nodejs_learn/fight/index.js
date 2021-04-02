/**
 * Created by mac on 15/12/9.
 */

var server = require("./ssserver");
var router = require("./router");

server.start(router.route);