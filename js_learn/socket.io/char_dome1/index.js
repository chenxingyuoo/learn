/**
 * Created by mac on 16/6/30.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(8908, function(){
    console.log('Listening at http://localhost:8008');
});

var socketUser = [
    {
        'username' : 'socketUser1',
        'userid' : 1,
        'sex' : 1,
        'phone' : '12345678910'
    },
    {
        'username' : 'socketUser2',
        'userid' : 2,
        'sex' : 1,
        'phone' : '12345678910'
    },
    {
        'username' : 'socketUser3',
        'userid' : 3,
        'sex' : 2,
        'phone' : '12345678910'
    }
];

//socket连接事件
io.on('connection', function (socket) {

     //发送信息给新登录用户
    socket.emit('system',{
        'alluser':socketUser
    });

    //上线欢迎
    socket.emit('open',{
        'msg':'welcome!'
    });

    //下线推送通知  disconnect方法名不能修改
    socket.on('disconnect',function(){
        //更改用户不在线
        socket.broadcast.emit('broadcast',{
            'msg':'noline1',
            'unlineid':'userid1',
            'unlinename':'username1',
            'type':1
        });
    });

    //监听接收用户信息
    socket.on('sendnews', function (data) {
        debugger
        console.log('msg : ' +  data);
        data.fromusername = 'chen';
        socket.emit('receivenews',data);
    });

    //广播  推送已登录的用户
    socket.broadcast.emit('broadcast',{
        'userid':'userid2',
        'username':'username2',
        'type':2
    });
});