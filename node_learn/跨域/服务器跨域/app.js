/**
 * Created by chenxingyu on 2017/2/27.
 */
const express = require('express');
const superagent  = require('superagent');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
const port = 8888;

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

app.post('/feXhr',(req,res) => {
    let url  = req.body.url;
    superagent.get(url)           //使用superagent向api接口发送请求
        .end(function (err,docs) {
            if(err){
                console.log(err);
                return
            }
            res.end(docs.res.text); //返回到前端
        })
});

app.listen(port, function (argument) {
    // body...
    console.log(`http://localhost:${port}`);
});

module.exports = app;