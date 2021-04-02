/**
 * Created by chenxingyu on 2017/2/27.
 */
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


//http://127.0.0.1:3000/beXhr
app.get('/beXhr',(req,res) => {

    let obj = {
        type : 'superagent',
        name : 'weapon-x'
    };

    res.writeHead(200, {
        "Content-Type": "text/html; charset=UTF-8",
        "Access-Control-Allow-Origin": 'http://127.0.0.1:8888'
    });
    // res.writeHead(200, {"Content-Type": "text/javascript"});
    res.end(JSON.stringify(obj));     //响应
})


app.listen(port, function (argument) {
    // body...
    console.log(`http://localhost:${port}`);
});