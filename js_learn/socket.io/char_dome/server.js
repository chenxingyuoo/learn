/**
 * Created by mac on 16/6/29.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);  // 向 socket.io 传递一个http服务器， 新建了一个socket.io实例 ，接着 我对传递进来的套接字（socket），监听connection事件，并将事件打印到console。

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//socket链接事件
io.on('connection', function(socket){

    socket.on('chat message', function(msg){
        console.log('chat message', msg);
        //为了给每个客户端发送消息，Socket.io提供了io.emit： ， 我们给每个连接的用户都发送消息
        io.emit('chat message', msg);
    });

    //如果你想给每个人发送消息，出了某个特定的socket连接，我们可以用boardcast标示符：
    socket.broadcast.emit('hi');

    console.log('a user connected');
    //socket断开事件
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

//io.emit('some event', { for: 'everyone' });

http.listen(3000, function(){
    console.log('Listening at http://localhost:3000');
});