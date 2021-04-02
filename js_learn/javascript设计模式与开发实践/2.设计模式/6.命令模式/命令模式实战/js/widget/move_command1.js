/**
 * Created by chenxingyu on 2017/3/6.
 */
"use strict";

var MoveCommand = function () {
    var timer = null;
    var num = 0;
    return {
        commandsList: [],
        currentPos: -1,
        last: null,
        first: null,
        add: function (command) {
            num = num + 1;
            command.step = num;
            this.commandsList.push(command);

            this.currentPos = this.currentPos + 1;
        },
        //执行
        execute: function () {

            debugger;

            // if (this.currentPos < 0) {
            //     this.currentPos = this.currentPos + 2;
            // } else {
            //     this.currentPos = this.currentPos + 1;
            // }

            this.currentPos = this.currentPos + 1;

            var command = this.commandsList[this.currentPos];

            if (command === this.first) {
                this.currentPos = this.currentPos + 1;

                command = this.commandsList[this.currentPos];
            }

            if (!command) {
                command = this.last;
            }

            //设置样式
            this.setPos(command);



        },
        //撤销
        undo: function () {

            if (this.commandsList.length > 0) {

                debugger;

                this.currentPos = this.currentPos - 1;

                var command = this.commandsList[this.currentPos];

                if (!command) {
                    // this.currentPos = this.currentPos -1;
                    command = this.commandsList[this.currentPos];
                }

                //设置样式
                this.setPos(command);



            } else {
                alert('已经到返回到最后一级了');
            }
        },
        //重播
        replay: function () {
            var self = this;
            //循环播放
            timer = setInterval(function () {
                //撤销
                self.undo();

                //清除定时器
                if (self.commandsList.length === 0) {
                    clearInterval(timer);
                }
            }, 200);
        },
        //反重播
        antiReplay: function () {
            var self = this;
            //循环播放
            timer = setInterval(function () {
                //执行
                self.execute();

                //清除定时器
                if (self.tmpList.length === 0) {
                    clearInterval(timer);
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