var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var ejs = require('ejs');

var app = express();


//模板文件
app.set('views', __dirname + '/public');
// app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function (req, res) {
    res.render('index');
});


app.use('/', router);


var env = app.get('env');
console.log(env);

if (env === 'development') {
    app.use(express.static(__dirname + '/public'));
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}

if (env === 'production') {
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', {maxAge: oneYear}));
    app.use(errorHandler());
}

console.log("Web server has started.\nPlease log on http://127.0.0.1:8001");
app.listen(8001);
