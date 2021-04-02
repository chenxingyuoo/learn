/**
 * Created by chenxingyu on 2017/3/6.
 */
"use strict";

var MoveCommand = function () {
    var timer = null;
    var num = 0;
    return {
        commandList: [],
        tmpList: [],
        last: null,
        tmpLast : null,
        first: null,
        add: function (command) {
            num = num + 1;
            command.step = num;
            this.commandList.push(command);
        },
        //执行
        // execute : function (){
        //
        //     if (this.tmpList.length > 0) {
        //
        //         //从栈堆第一个取出命令
        //         var command = this.tmpList.shift();
        //
        //         //判断是否是数组里最后一个 ， 是的话向队列前面添加第一个
        //         if (this.tmpList.length === 0) {
        //             this.commandList.unshift(this.first);
        //         } else {
        //             //向队列后面添加一个
        //             this.commandList.push(command);
        //         }
        //
        //         //设置样式
        //         this.setPos(command);
        //     }
        // },

        execute: function () {
            //从栈堆第一个取出命令
            var command = this.tmpList.shift();
            console.log(this.commandList, 'commandList');
            console.log(this.tmpList, 'tmpList');

            if (command) {

                //向队列后面添加一个
                this.commandList.push(command);

                //设置样式
                this.setPos(command);

                if (command.step === 1) {
                    this.execute();
                }
            }



            if (!command && this.last) {
                //设置样式
                this.setPos(this.last);

                this.tmpLast = this.last;

                this.last = null;
            }

            console.log(this.last);

        },
        //撤销
        // undo : function (){
        //
        //     if (this.commandList.length > 0) {
        //
        //         //从栈堆最后一个取出命令
        //         var command = this.commandList.pop();
        //
        //         //判断是否是数组里最后一个 ， 是的话向向队列后面添加一个
        //         if (this.commandList.length === 0) {
        //             this.tmpList.push(this.last);
        //         } else {
        //             //向队列前面添加到tmpList
        //             this.tmpList.unshift(command);
        //         }
        //
        //         //设置样式
        //         this.setPos(command);
        //
        //     } else {
        //         alert('已经到返回到最后一级了');
        //     }
        // },

        undo: function () {
            //从栈堆最后一个取出命令
            var command = this.commandList.pop();
            console.log(this.commandList, 'commandList');
            console.log(this.tmpList, 'tmpList');
            if (command) {

                //向队列前面添加到tmpList
                this.tmpList.unshift(command);

                //设置样式
                this.setPos(command);
            }

            if (this.tmpLast) {
                this.last = this.tmpLast;

                this.tmpLast = null;
            }

            console.log(this.last);

        },

        //重播
        replay: function () {
            var self = this;
            if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
                return false;
            }
            //循环播放
            timer = setInterval(function () {
                //撤销
                self.undo();

                //清除定时器
                if (self.commandList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 200);
        },
        //反重播
        antiReplay: function () {
            var self = this;

            if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
                return false;
            }

            //循环播放
            timer = setInterval(function () {
                //执行
                self.execute();

                //清除定时器
                if (self.tmpList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 200);
        },
        //设置样式
        setPos: function (command) {
            command.el.style.left = command.l2 + 'px';
            command.el.style.top = command.k2 + 'px';
        }
    }
};

module.exports = MoveCommand;