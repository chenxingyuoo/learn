/**
 * Created by chenxingyu on 2016/12/7.
 */
document.addEventListener('DOMContentLoaded', function(){
    var hichat = new HiChat();
    hichat.init();
}, false);

var $ = function selector(selector){
    return document.querySelector(selector)
};

//定义我们的hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init : function (){
        var that = this;
        var nicknameInput = $('#nicknameInput');
        var loginWrapper = $('#loginWrapper');
        var historyMsg = $('#historyMsg');
        var loginBtn = $('#loginBtn');
        var messageInput = $('#messageInput');
        var nickWrapper = $('#nickWrapper');
        var status = $('#status');
        var info = $('#info');
        var sendBtn = $('#sendBtn');
        var sendImage = $('#sendImage');
        var colorStyle = $('#colorStyle');


        //建立到服务器的socket连接
        this.socket = io.connect();

        //监听socket的connect事件，此事件表示连接已经建立
        this.socket.on('connect', function() {
            //连接到服务器后，显示昵称输入框
            info.textContent = 'get yourself a nickname :)';
            nickWrapper.style.display = 'block';
            nicknameInput.focus();
        });


        this.socket.on('nickExisted', function() {
            info.textContent = '!nickname is taken, choose another pls';
        });

        this.socket.on('loginSuccess', function() {
            document.title = 'hichat | ' + document.getElementById('nicknameInput').value;
            loginWrapper.style.display = 'none';
            messageInput.focus();
        });

        this.socket.on('error', function(err) {
            if (loginWrapper.style.display == 'none') {
                status.textContent = '!fail to connect :(';
            } else {
                info.textContent = '!fail to connect :(';
            }
        });


       /* this.socket.on('system', function(nickName, userCount, type) {
            //判断用户是连接还是离开以显示不同的信息
            var msg = nickName + (type == 'login' ? ' joined' : ' left');
            var p = document.createElement('p');
            p.textContent = msg;
            historyMsg.appendChild(p);
            //将在线人数显示到页面顶部
            status.textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });*/

        this.socket.on('system', function(nickName, userCount, type) {
            var msg = nickName + (type == 'login' ? ' joined' : ' left');
            //指定系统消息显示为红色
            that._displayNewMsg('system ', msg, 'red');
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });

        this.socket.on('newMsg', function(user, msg, color) {
            that._displayNewMsg(user, msg, color);
        });


        //登录
        function login(){
            var nickName = nicknameInput.value;
            //检查昵称输入框是否为空
            if (nickName.trim().length != 0) {
                //不为空，则发起一个login事件并将输入的昵称发送到服务器
                that.socket.emit('login', nickName);
            } else {
                //否则输入框获得焦点
                nicknameInput.focus();
            }
        }

        //昵称设置的确定按钮
        loginBtn.addEventListener('click', function() {
            login();
        }, false);


        //点击回车键登录
        nicknameInput.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                login();
            }
        }, false);


        //发送消息
        function sendMsg(){
            var msg = messageInput.value,
                color = colorStyle.value;
            messageInput.value = '';
            messageInput.focus();
            if (msg.trim().length != 0) {
                that.socket.emit('postMsg', msg, color); //把消息发送到服务器
                that._displayNewMsg('me', msg, color); //把自己的消息显示到自己的窗口中
            }
        }

        //点击发送消息
        sendBtn.addEventListener('click',function (){
            sendMsg();
        },false);

        //按下回车发送消息
        messageInput.addEventListener('keydown', function (e){
            var enter = e.keyCode === 13;
            if(e.shiftKey && enter){
                return;
            }

            if(enter){
                sendMsg();
            }
        }, false);

        //发送文件
        sendImage.addEventListener('change',function (){
            //检查是否有文件被选中
            if (this.files.length != 0) {
                //获取文件并用FileReader进行读取
                var file = this.files[0],
                    reader = new FileReader();
                if (!reader) {
                    that._displayNewMsg('system', "!your browser doesn't support fileReader", "red");
                    this.value = '';
                    return;
                }
                reader.onload = function(e) {
                    //读取成功，显示到页面并发送到服务器
                    this.value = '';
                    that.socket.emit('img', e.target.result);
                    that._displayImage('me', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },false);

        //初始化表情包
        this._initialEmoji();

        var emoji = $('#emoji');
        var emojiWrapper = $('#emojiWrapper');

        //点击显示表情包
        emoji.addEventListener('click', function(e) {
            emojiWrapper.style.display = 'block';
            e.stopPropagation();
        }, false);

        //点击隐藏表情包
        document.body.addEventListener('click', function(e) {
            if (e.target != emojiWrapper) {
                emojiWrapper.style.display = 'none';
            }
        },false);

        //点击发送表情
        emojiWrapper.addEventListener('click', function(e) {
            //获取被点击的表情
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                messageInput.focus();
                messageInput.value = messageInput.value + '[emoji:' + target.title + ']';
            }
        }, false);

    },
    //发送文本消息
    _displayNewMsg : function (user, msg, color){
        var container = $('#historyMsg'),
            msgToDisplay = document.createElement('p'),

        //将消息中的表情转换为图片
        msg = this._showEmoji(msg);

        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span>' + msg;
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    //发送图片
    _displayImage : function (user, imgData, color){
        debugger;
        var container = $('#historyMsg'),
            msgToDisplay = document.createElement('p'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.style.color = color || '#000';
        msgToDisplay.innerHTML = user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
        container.appendChild(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    //初始化表情包
    _initialEmoji : function (){
        var emojiContainer = $('#emojiWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 69; i > 0; i--) {
            var emojiItem = document.createElement('img');
            emojiItem.src = '../image/emoji/' + i + '.gif';
            emojiItem.title = i;
            docFragment.appendChild(emojiItem);
        }
        emojiContainer.appendChild(docFragment);
    },
    //显示表情
    _showEmoji : function (msg){
        var match, result = msg,
            reg = /\[emoji:\d+\]/g,
            emojiIndex,
            totalEmojiNum = $('#emojiWrapper').children.length;

        while (match = reg.exec(msg)) {
            emojiIndex = match[0].slice(7, -1);
            if (emojiIndex > totalEmojiNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="emoji" src="../image/emoji/' + emojiIndex + '.gif" />');
            }
        }

        return result;
    }
};


