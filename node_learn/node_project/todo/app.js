var express = require('express')
  , todo = require('./controllers/todo')
  , http = require('http')
  , config = require("./config")
  , todoDao = require("./dao/todoDao");


var app = express();

app.engine('html', require('ejs').renderFile);

app.configure(function(){

  app.set('port', config.port);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});



app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', todo.index);
app.post('/todo/new', todo.new);
app.get('/todo/:id', todo.view);
app.get('/todo/:id/edit', todo.edit);
app.post('/todo/:id/edit', todo.save);
app.get('/todo/:id/delete', todo.delete);
app.get('/todo/:id/finish', todo.finish);

todoDao.connect(function(error){
    if (error) throw error;
});
app.on('close', function(errno) {
    todoDao.disconnect(function(err) { });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
