var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var ejs = require('ejs');  //手动引入ejs 以便支持html格式

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./db');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));//引入视图路径

/*app.set('view engine', 'jade');*/

//使用ejs模板引擎 ， 手动让ejs 支持html格式
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(partials());   //解决使用layout公共模板的问题

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//是 Cookie 解析的中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//配置了静态文件服务器,因此 /stylesheets/style.css 会定向到 app.js 所在目录的子目录中的文件 public/stylesheets/style.css, 向客户端返回以下信息:

//会话支持,  则 提供会话支持,设置它的 store 参数为 MongoStore 实例,把会话信息存储到数据库中, 以避免丢失。

app.use(session({
    secret: 'xiaochen',
    store: new MongoStore({
        /*db: settings.db,*/
        mongooseConnection :db.dbCon
    })
}));

/*app.dynamicHelpers({
    user: function (req, res) {
        return req.session.user;
    },
    error: function (req, res){
        var err = req.flash('error');
￼       if (err.length){
            return err;
        } else {
            return null;
        }
    },
    success: function (req, res) {
        var succ = req.flash('success');
        if (succ.length){
            return succ;
        }else{
            return null;
        }

    }
});*/

/*

 app.use(session({
 secret: 'xiaochen',
 store: new MongoStore({
 db: settings.db,
 mongooseConnection: db.dbCon
 })
 }));



 // error handlers
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
 res.locals.message="*"+err;
 }
 if(mess){
 res.locals.message="*"+mess;
 }
 if(success){
 res.locals.success=success;
 }
 if(user){
 res.locals.user=user.name;
 }
 next();
 });*/


app.use('/', routes);
app.use('/users', users);
//app.get('/hello', routes);

/*app.all('/user/:username', function(req, res, next) {
 res.send('all methods captured');
 next();
 });*/

/*app.get('/list', routes);

 app.get('/user/:username', users );

 app.get('/u/:user', routes);
 app.post('/post', routes);
 app.get('/reg', routes);
 app.post('/reg', routes);
 app.get('/login', routes);
 app.post('/login', routes);
 app.get('/logout', routes);*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
