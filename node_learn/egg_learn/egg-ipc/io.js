'use strict'

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


function handler (req, res) {
  fs.readFile(__dirname + '/index1.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
      });
}

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
      console.log('mylog', 'connection chat')
      // socket.emit('a message', {
      //   that: 'only'
      //   , '/chat': 'will get'
      // });
      // chat.emit('a message', {
      //   everyone: 'in'
      //   , '/chat': 'will get'
      // });

      socket.on('chatEvent', function (data){
        console.log('chatEvent', data)
      });

    })




var news = io
    .of('/news')
    .on('connection', function (socket) {
      console.log('mylog', 'connection news')
      socket.emit('news', { news: 'item' });
    });

app.listen(8090);
