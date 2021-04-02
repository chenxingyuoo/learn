var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');


//导入模型
require('./models/movie');
require('./models/comment');
require('./models/category');
require('./models/user');

var port = process.env.PORT || 3005;
var app = express();

//操作数据库
var dbUrl = 'mongodb://localhost/fight1';
mongoose.connect(dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views/page'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
                              //extend 方法 ， 深拷贝 。 设置false的时候 ，获取不了表单的对象
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment'); //moment模块

//定义 session ， 要先执行 app.use(cookieParser());
app.use(session({
  secret: 'fight1',
  store: new mongoStore({
    url : dbUrl,
    collection: 'sessions'
  })
}));

app.listen(port);

console.log('listen http://localhost:' + port);

/*app.use('/', routes);
app.use('/users', users);*/
require('./config/routes')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//module.exports = app;
