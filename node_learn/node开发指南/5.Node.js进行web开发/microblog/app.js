var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();
var port = 3000;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./db');
var settings = require('./settings');

var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger({stream: accessLogfile}));
app.use(logger({stream: errorLogfile}));

app.use(session({
  secret: settings.cookieSecret,
/*  store: new MongoStore({
    db: settings.db
  })*/
  store: new MongoStore({
    /*db: settings.db,*/
    mongooseConnection :db.dbCon
  })
}));


//引入路由 , 这里必须要等 bodyParser 引入之后才引入 , 不然无法正常解析req.body
var appRouter = require('./router');
appRouter(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  errorLogfile.write(res.locals.error + '\n');

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port,function (argument) {
	// body...
	console.log('http://localhost:' + port);
});

module.exports = app;
