/**
 * Created by mac on 16/6/27.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http),
    fs = require('fs'),
    cookie=require('cookie');
global.userlist={};


http.listen(8008, function(){
    console.log('Listening at http://localhost:8008');
});
//io.set('log level', 1);//将socket.io中的debug信息关闭

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

function handler (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}
var content;
var socketUser = {
    'socketUser' : ['socketUser1','socketUser2']
};
var settings={};
settings.host='http://localhost/test/node/myapp/';
io.on('connection', function (socket) {


    console.log('connection');

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
        //socketUser[id]=null;
        //userlist[id]=null;
        //request(settings.host+'getinfo.php?type=unline&sid='+id,function(err,res,body){})
        socket.broadcast.emit('broadcast',{
            'msg':'noline',
            'unlineid':'userid',
            'unlinename':'username',
            'type':1
        });
    })

    //监听接收用户信息
    socket.on('sendnews', function (data) {

        console.log('msg : ' +  data);
        data.fromusername = 'chen';
        socket.emit('receivenews',data);

        /*if(data.touserid&&userlist[data.touserid]!=undefined){
            var user=userlist[data.touserid];
            data.fromusername=socketUser[data.fromuserid].username;
            //将用户信息发送给指定用户
            user.emit('receivenews',data);
        }else{
            socket.emit('receivenews',data);
        }*/
    });

    //广播  推送已登录的用户
    socket.broadcast.emit('broadcast',{
        'userid':'userid',
        'username':'username',
        'type':2
    });
    /*if(socket.handshake.headers.cookie){
        var curcookie=cookie.parse(socket.handshake.headers.cookie);
        var id=curcookie['PHPSESSID'];
        request(settings.host+'getinfo.php?type=getinfo&sid='+id,function(err,res,body){
            if(!err&&res.statusCode==200){
                if(body){
                    body=eval('('+body+')');
                    var userid=body.ID;
                    var username=body.UserName;
                    var online=body.Online;
                    //将新用户存进socket用户列表中
                    userlist[id]=socket;

                    socketUser[id] = {
                        'userid':userid,
                        'username':username
                    };
                    //更改上线状态
                    request(settings.host+'getinfo.php?type=online&sid='+id,function(err,res,body){})


                }else{
                    console.log('falseness connect');
                }
            }
        })
    }else{
        console.log('cookie not exist');
    }*/
});