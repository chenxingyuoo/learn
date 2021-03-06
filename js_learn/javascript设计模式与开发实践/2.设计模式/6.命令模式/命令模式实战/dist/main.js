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


//?????????
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


//???????????? , ??????????????? ????????????????????????
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

    //????????????
    el.addEventListener('mousedown', function (e) {
        obj.event = e;
        obj.disX = e.clientX - el.offsetLeft;
        obj.disY = e.clientY - el.offsetTop;
        obj.l2 =  e.clientX - obj.disX;
        obj.k2 = e.clientY - obj.disY;

        //??????????????????
        var moveStartObj = Object.assign({}, obj);
        //??????????????????
        opts.moveStart ? opts.moveStart(moveStartObj) : '';

        //??????????????????
        if (obj.el.setCapture) {
            obj.el.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }

        //??????????????????????????????
        document.ondragstart = function () {
            return false;
        };

        //????????????
        document.onmousemove = function (e) {
            e.stopPropagation();

            //????????????????????????????????? ??? ????????? ????????????
            timer = window.requestAnimFrame(function () {
                //???????????????
                obj.l2 = e.clientX - obj.disX;
                obj.k2 = e.clientY - obj.disY;

                //????????????
                obj.el.style.left = obj.l2 + 'px';
                obj.el.style.top = obj.k2 + 'px';

                //??????????????????
                opts.move ? opts.move(obj) : '';

            });
        };

        //????????????
        document.onmouseup = function (e) {
            window.cancelAnimFrame(timer);

            //??????????????????
            if (el.releaseCapture) {
                el.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            //????????????
            document.onmousemove = null;
            document.onmouseup = null;

            //??????????????????
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
        //??????
        // execute : function (){
        //
        //     if (this.tmpList.length > 0) {
        //
        //         //??????????????????????????????
        //         var command = this.tmpList.shift();
        //
        //         //???????????????????????????????????? ??? ???????????????????????????????????????
        //         if (this.tmpList.length === 0) {
        //             this.commandList.unshift(this.first);
        //         } else {
        //             //???????????????????????????
        //             this.commandList.push(command);
        //         }
        //
        //         //????????????
        //         this.setPos(command);
        //     }
        // },

        execute: function () {
            //??????????????????????????????
            var command = this.tmpList.shift();
            console.log(this.commandList, 'commandList');
            console.log(this.tmpList, 'tmpList');

            if (command) {

                //???????????????????????????
                this.commandList.push(command);

                //????????????
                this.setPos(command);

                if (command.step === 1) {
                    this.execute();
                }
            }



            if (!command && this.last) {
                //????????????
                this.setPos(this.last);

                this.tmpLast = this.last;

                this.last = null;
            }

            console.log(this.last);

        },
        //??????
        // undo : function (){
        //
        //     if (this.commandList.length > 0) {
        //
        //         //?????????????????????????????????
        //         var command = this.commandList.pop();
        //
        //         //???????????????????????????????????? ??? ???????????????????????????????????????
        //         if (this.commandList.length === 0) {
        //             this.tmpList.push(this.last);
        //         } else {
        //             //????????????????????????tmpList
        //             this.tmpList.unshift(command);
        //         }
        //
        //         //????????????
        //         this.setPos(command);
        //
        //     } else {
        //         alert('?????????????????????????????????');
        //     }
        // },

        undo: function () {
            //?????????????????????????????????
            var command = this.commandList.pop();
            console.log(this.commandList, 'commandList');
            console.log(this.tmpList, 'tmpList');
            if (command) {

                //????????????????????????tmpList
                this.tmpList.unshift(command);

                //????????????
                this.setPos(command);
            }

            if (this.tmpLast) {
                this.last = this.tmpLast;

                this.tmpLast = null;
            }

            console.log(this.last);

        },

        //??????
        replay: function () {
            var self = this;
            if ( timer ) { // ??????????????????????????????????????????????????????????????????
                return false;
            }
            //????????????
            timer = setInterval(function () {
                //??????
                self.undo();

                //???????????????
                if (self.commandList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 200);
        },
        //?????????
        antiReplay: function () {
            var self = this;

            if ( timer ) { // ??????????????????????????????????????????????????????????????????
                return false;
            }

            //????????????
            timer = setInterval(function () {
                //??????
                self.execute();

                //???????????????
                if (self.tmpList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 200);
        },
        //????????????
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

//????????????
var moveCommand = __webpack_require__(2)();

//????????????
var MoveBox = __webpack_require__(1);

//??????????????????
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

//????????????
revoked.addEventListener('click', function (){
    moveCommand.undo();
},false);

//???????????????
antiRevocation.addEventListener('click', function (){
    moveCommand.execute();
}, false);

//????????????
replay.addEventListener('click', function (){
    moveCommand.replay()
},false);

//???????????????
antiReplay.addEventListener('click', function (){
    moveCommand.antiReplay();
},false);

//???????????????????????? (ctrl + z ?????? command + z) ??????
document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    var ctrlKey = e.ctrlKey;
    var metaKey = e.metaKey; //mac ??? command ???
    if ((ctrlKey || metaKey) && keyCode === 90) {
        moveCommand.undo();
    }
}, false);

/***/ })
/******/ ]);