/**
 * Created by mac on 16/7/14.
 */
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

//require('./a');

// 创建一个http server 启动端口
app.listen(3000);
console.log('listen at  http://localhost/' + 3000);