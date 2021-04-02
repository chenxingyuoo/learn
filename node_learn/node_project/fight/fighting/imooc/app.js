/**
 * Created by mac on 16/1/4.
 */
/*var debug = require('debug')('imooc');*/
var express = require('express');
var path = require('path');

//在express 默认生成的代码中，变量名为logger（记录器）, 主要功能是：在控制台中，显示req请求的信息。
var logger = require('morgan');
//操作数据库
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');//需要安装模块npm install body-parser .传给后台post，将表单数据格式化
var cookieParser = require('cookie-parser');

var dbUrl = 'mongodb://localhost/imooc';
//传入本地数据库 ， 名字imooc
mongoose.connect(dbUrl);

require('./app/models/movie');
require('./app/models/user');
require('./app/models/category');
require('./app/models/comment');

app.set("views","./app/views/pages");
app.set("view engine","jade"); // jade 前端模板
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))) //__dirname 当前目录找静态资源库文件
app.locals.moment = require('moment'); //moment模块
app.listen(port);

console.log('hello world' + port);

app.use(cookieParser());
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        url : dbUrl,
        collection: 'sessions'
    })
}));


/*app.use(function(req,res,next){
//    res.locals.user=req.session.user;
    var err=req.session.error;
    var success=req.session.success;
    var user=req.session.user;
    var mess=req.session.message;
    delete req.session.success;
    delete  req.session.error;
    delete  req.session.message;
    if(err){
        res.locals.message = "*"+err;
    }
    if(mess){
        res.locals.message = "*"+mess;
    }
    if(success){
        res.locals.success = success;
    }
    if(user){
        res.locals.user = user;
    }
    next();
});*/


require('./config/routes')(app);


// development error handler
// will print stacktrace
if ('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    //mongoose.set('debug', true)
}



