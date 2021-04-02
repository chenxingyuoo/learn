/**
 * Created by chenxingyu on 2017/2/27.
 */
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


//模板文件
app.set('views', path.join(__dirname, './views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './'))); //静态资源

app.get('/', (req, res) => {
    res.render('index', {title: ''});
});

//http://127.0.0.1:2333/jsonpHandler
app.get('/jsonpHandler', (req, res) => {
    let callback = req.query.callback;
    console.log(callback);
    let obj = {
        type: 'jsonp',
        name: 'weapon-x'
    };
    res.writeHead(200, {"Content-Type": "text/javascript"});
    res.end(callback + '(' + JSON.stringify(obj) + ')');
});

app.listen(port, function (argument) {
    // body...
    console.log(`http://localhost:${port}`);
});

module.exports = app;