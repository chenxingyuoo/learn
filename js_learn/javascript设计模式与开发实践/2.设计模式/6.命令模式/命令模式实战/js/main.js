/**
 * Created by chenxingyu on 2017/3/6.
 */
"use strict";

require('./widget/common');

//命令对象
var moveCommand = require('./widget/move_command')();

//移动盒子
var MoveBox = require('./widget/move_box');

//移动处理程序
MoveBox({
    el: '.box',
    moveStart : function (obj){
        // if (!moveCommand.first) {
        //     moveCommand.first = obj;
        //     return
        // }

        moveCommand.add(obj);

    },
    moveEnd : function (obj){
        // moveCommand.add(obj);
        moveCommand.last = obj;

        if (moveCommand.tmpLast) {
            moveCommand.add(moveCommand.tmpLast);
            moveCommand.tmpLast = null;
        }
    }
});

var revoked = document.querySelector('#revoked');
var antiRevocation = document.querySelector('#anti-revocation');
var replay = document.querySelector('#replay');
var antiReplay = document.querySelector('#anti-replay');

//点击撤销
revoked.addEventListener('click', function (){
    moveCommand.undo();
},false);

//点击反撤销
antiRevocation.addEventListener('click', function (){
    moveCommand.execute();
}, false);

//点击重播
replay.addEventListener('click', function (){
    moveCommand.replay()
},false);

//点击反重播
antiReplay.addEventListener('click', function (){
    moveCommand.antiReplay();
},false);

//监听键盘按下事件 (ctrl + z 或者 command + z) 撤销
document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    var ctrlKey = e.ctrlKey;
    var metaKey = e.metaKey; //mac 的 command 键
    if ((ctrlKey || metaKey) && keyCode === 90) {
        moveCommand.undo();
    }
}, false);