/**
 * Created by chenxingyu on 2016/12/7.
 */
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const opn = require('opn')
const ejs = require('ejs');  //手动引入ejs 以便支持html格式
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 8899
const users = [];//保存所有在线用户的昵称

//specify the html we will use
// app.use('/', express.static(__dirname + '/app'));

//引入视图路径
app.set('views', path.join(__dirname, '/app/views'));

//使用ejs模板引擎 ， 手动让ejs 支持html格式
app.engine('.html', ejs.__express);
app.set('view engine', 'html');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//配置了静态文件服务器,因此 /stylesheets/style.css 会定向到 app.js 所在目录的子目录中的文件 public/stylesheets/style.css, 向客户端返回以下信息:
app.use(express.static(path.join(__dirname, '/app/static')));

//导入路由
require('./server/routes')(app);

//specify the html we will use
process.on(`uncaughtException`, console.error);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


server.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
    opn(uri)
});


//socket部分
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件
    // socket.on('foo', function(data) {
    //     //将消息输出到控制台
    //     console.log(data);
    // })

    //昵称设置
    socket.on('login', function(nickname) {

        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login'); //向所有连接到服务器的客户端发送当前登陆用户的昵称
        }

        console.log(nickname);
        console.log(users);
    });

    //断开连接的事件
    socket.on('disconnect', function() {
        //将断开连接的用户从users中删除
        users.splice(socket.userIndex, 1);
        //通知除自己以外的所有人
        socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
    });

    //接受文本消息
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });


   //接收用户发来的图片
    socket.on('img', function(imgData) {
        //通过一个newImg事件分发到除自己外的每个用户
        socket.broadcast.emit('newImg', socket.nickname, imgData);
    });

});

