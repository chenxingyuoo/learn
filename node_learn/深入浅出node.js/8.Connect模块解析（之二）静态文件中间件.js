/**
 * Created by chenxingyu on 2017/5/6.
 */
var connect = require('connect');
var app = connect();
app.use('/public',connect.static(__dirname + '/public'), {maxAge: 86400000});