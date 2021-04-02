/**
 * Created by chenxingyu on 2016/12/15.
 */

var express = require('express');
var app = express();

app.get('/', function(req, res){
    console.log(req.body);
    res.send(req.body.title + req.body.text);
});

app.listen(3000);