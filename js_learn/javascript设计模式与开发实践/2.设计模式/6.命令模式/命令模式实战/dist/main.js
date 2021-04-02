/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chenxingyu on 2017/3/6.
 */


//定时器
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||function(callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function (){
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by Administrator on 2016/8/29.
 */


//移动盒子 , 绑定事件， 实现元素进行拖拽
function MoveBox(opts) {
    opts = opts || {};
    var el = typeof opts.el === 'string' ? document.querySelector(opts.el) : opts.el;
    var timer = null;
    var obj = {
        event: null,
        el: el,
        disX: null,
        disY: null,
        l2: null,
        k2: null
    };

    //监听事件
    el.addEventListener('mousedown', function (e) {
        obj.event = e;
        obj.disX = e.clientX - el.offsetLeft;
        obj.disY = e.clientY - el.offsetTop;
        obj.l2 =  e.clientX - obj.disX;
        obj.k2 = e.clientY - obj.disY;

        //移动开始对象
        var moveStartObj = Object.assign({}, obj);
        //执行回调函数
        opts.moveStart ? opts.moveStart(moveStartObj) : '';

        //设置捕获范围
        if (obj.el.setCapture) {
            obj.el.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }

        //解决拖不动图片的问题
        document.ondragstart = function () {
            return false;
        };

        //鼠标移动
        document.onmousemove = function (e) {
            e.stopPropagation();

            //这里应该写一个回调函数 ， 理由： 比较灵活
            timer = window.requestAnimFrame(function () {
                //获取偏移值
                obj.l2 = e.clientX - obj.disX;
                obj.k2 = e.clientY - obj.disY;

                //设置样式
                obj.el.style.left = obj.l2 + 'px';
                obj.el.style.top = obj.k2 + 'px';

                //执行回调方法
                opts.move ? opts.move(obj) : '';

            });
        };

        //鼠标松开
        document.onmouseup = function (e) {
            window.cancelAnimFrame(timer);

            //取消捕获范围
            if (el.releaseCapture) {
                el.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            //解除事件
            document.onmousemove = null;
            document.onmouseup = null;

            //执行回调方法
            opts.moveEnd ? opts.moveEnd(obj) : '';
        };

    }, false);


}

module.exports = MoveBox;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chenxingyu on 2017/3/6.
 */


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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by chenxingyu on 2017/3/6.
 */


__webpack_require__(0);

//命令对象
var moveCommand = __webpack_require__(2)();

//移动盒子
var MoveBox = __webpack_require__(1);

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

/***/ })
/******/ ]);