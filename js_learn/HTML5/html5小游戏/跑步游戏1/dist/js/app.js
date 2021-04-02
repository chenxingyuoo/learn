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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	var _img_obj = __webpack_require__(1);

	var _img_obj2 = _interopRequireDefault(_img_obj);

	__webpack_require__(2);

	var _background = __webpack_require__(3);

	var _background2 = _interopRequireDefault(_background);

	var _run = __webpack_require__(4);

	var _run2 = _interopRequireDefault(_run);

	var _road = __webpack_require__(5);

	var _road2 = _interopRequireDefault(_road);

	var _time = __webpack_require__(6);

	var _time2 = _interopRequireDefault(_time);

	var _data = __webpack_require__(7);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//获取DOM

	//时间

	//跑男


	//commonjs
	var app = document.querySelector('#app');
	//数据

	//公路


	//背景方法

	var indexBox = app.querySelector('#index-box');
	var gameBox = app.querySelector('#game-box');
	var startBtn = app.querySelector('.start-btn');

	//画布对象
	var canvas = app.querySelector('#canvas');
	var context = canvas.getContext('2d');

	var width = 640;
	var height = document.documentElement.clientHeight;

	/**
	 *  将画布宽高设置到全局变量下
	 *  设置画布宽高
	 **/
	window.canWidth = canvas.width = width;
	window.canHeight = canvas.height = height;

	window.lastTime = null; //记录最后一次的时间
	window.deltaTime = null; //增量时间

	/**
	 *  初始化
	 *
	 **/

	var gameBg = void 0;
	var gameRun = void 0;
	var gameRoad = void 0;
	var gameTime = void 0;

	//游戏数据
	var gameData = (0, _data2.default)();

	//初始化游戏
	var initGame = function initGame() {
	    //初始化一个游戏背景
	    gameBg = (0, _background2.default)(_img_obj2.default.gameBg);
	    //初始化跑男
	    gameRun = (0, _run2.default)(_img_obj2.default.gameGuy);
	    //初始化公路
	    gameRoad = (0, _road2.default)(_img_obj2.default.gameRoad);
	    //初始化时间
	    gameTime = (0, _time2.default)(_img_obj2.default.gameTime);

	    context.font = '22px verdana';
	};

	//点击开始游戏
	startBtn.addEventListener('click', function () {

	    lastTime = Date.now();
	    deltaTime = 0;

	    //初始化游戏
	    initGame();

	    //循环绘制
	    gameLoop();

	    gameBox.style.display = 'block';
	    indexBox.style.display = 'none';
	}, false);

	window.loopTime = 200;

	setInterval(function () {
	    window.loopTime = window.loopTime - 5;
	}, 3000);

	var gameLoop = function gameLoop() {
	    window.requestAnimFrame(gameLoop, 1000 / 16);

	    var nowTime = Date.now(); //当前时间
	    deltaTime = nowTime - lastTime; //deltaTime ，增量时间 ， 每两帧的时间间隔 ， 保证游戏画面流畅
	    lastTime = nowTime; //记录最后一次的时间

	    console.log(deltaTime);
	    console.log(lastTime);

	    //清除画布
	    context.clearRect(0, 0, canWidth, canHeight);

	    //绘制背景
	    gameBg.draw(context);

	    //绘制公路
	    gameRoad.draw(context, 640, 780);

	    //绘制跑男
	    gameRun.draw(context, 176, 377);

	    //绘制时间
	    gameTime.draw(context, 164, 79);

	    //绘制时间分秒数
	    gameData.draw(context);
	};

	// console.log(gameBg);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	//默认导出图片
	exports.default = {
	    resultBg: 'dist/img/result/bg.jpg',
	    indexBg: 'dist/img/index/bg.png',
	    indexPrize: 'dist/img/index/prize.png',
	    indexLogo: 'dist/img/index/logo.png',
	    indexRule2: 'dist/img/index/rule2.png',
	    indexRun: 'dist/img/index/run.png',
	    indexStartBtn: 'dist/img/index/start_btn.png',
	    indexTitle: 'dist/img/index/title.png',
	    gameAadd: 'dist/img/game/aadd.png',
	    gameBg: 'dist/img/game/bg.png',
	    gameControl: 'dist/img/game/control.png',
	    gameFinger: 'dist/img/game/finger.png',
	    gameFinish: 'dist/img/game/finish.png',
	    gameGuy: 'dist/img/game/guy.png',
	    gameLoading: 'dist/img/game/loading.png',
	    gameLogo: 'dist/img/game/logo.png',
	    gameMile: 'dist/img/game/mile.png',
	    gameMusic: 'dist/img/game/music.png',
	    gameProgress1: 'dist/img/game/progress1.png',
	    gameProgress2: 'dist/img/game/progress2.png',
	    gameRoad: 'dist/img/game/road.png',
	    gameSpots: 'dist/img/game/spots.png',
	    gameSpotsName: 'dist/img/game/spots_name.png',
	    gameTime: 'dist/img/game/time.png'
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by chenxingyu on 2017/3/16.
	 */

	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element) {
	        return window.setTimeout(callback, 1000 / 60);
	    };
	}();

	window.cancelAnimFrame = function () {
	    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = backGround;
	function backGround(src) {
	    var bgPic = new Image();
	    //设置url
	    bgPic.src = src;

	    var draw = function draw(context, width, height) {
	        context.drawImage(bgPic, 0, 0, canWidth, canHeight); //向画布上绘制图像、画布或视频
	    };

	    return {
	        draw: draw
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = run;
	function run(src) {
	    var timer = 0;
	    var index = 0; //保存index ， 用来切换动画
	    var runPic = new Image();

	    //设置url
	    runPic.src = src;

	    //向画布上绘制图像
	    var draw = function draw(context, width, height) {

	        //获取定时器时间
	        timer = timer + deltaTime;

	        //跑男的绘制时间是 loopTime
	        if (timer > loopTime) {
	            //获取当前的index
	            index = (index + 1) % 8;

	            //求余数循环
	            timer = timer % loopTime;
	        }

	        //保存当前环境的状态
	        context.save();
	        //偏移
	        context.translate((canWidth - width) / 2, canHeight - height - 150);
	        //绘制图片
	        context.drawImage(runPic, index * width, 0, width, height, 0, 0, width, height);
	        //返回之前保存过的路径状态和属性
	        context.restore();
	    };

	    return {
	        draw: draw
	    };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = road;
	function road(src) {
	    var timer = 0;
	    var index = 0; //保存index ， 用来切换动画
	    var roadPic = new Image();

	    roadPic.src = src;

	    //向画布上绘制图像
	    var draw = function draw(context, width, height) {
	        //获取定时器时间
	        timer = timer + deltaTime;

	        //公路的绘制时间是 loopTime * 2
	        var curLoopTime = loopTime * 2;
	        if (timer > curLoopTime) {
	            //获取当前的index
	            index = (index + 1) % 6;

	            //求余数循环
	            timer = timer % curLoopTime;
	        }

	        //保存当前环境的状态
	        context.save();
	        //偏移
	        context.translate(0, canHeight - height);
	        //绘制图片
	        context.drawImage(roadPic, index * width, 0, width, height, 0, 0, width, height);
	        //返回之前保存过的路径状态和属性
	        context.restore();
	    };

	    return {
	        draw: draw
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/16.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = time;
	function time(src) {
	    var timePic = new Image();

	    //设置图片路径
	    timePic.src = src;

	    var draw = function draw(context, width, height) {
	        //保存当前环境的状态
	        context.save();
	        //偏移
	        context.translate(20, 20);
	        //绘制图片
	        context.drawImage(timePic, 0, 0, width, height, 0, 0, width, height);
	        //返回之前保存过的路径状态和属性
	        context.restore();
	    };

	    return {
	        draw: draw
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2017/3/16.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = data;
	function data() {
	    var timeTimer = 0;
	    var timeNum = 0;
	    var timeText = '';
	    //判断游戏是否结束
	    var gameOver = false;

	    //偏移值
	    var left = 105;
	    var top = 65;

	    //如果等于100秒
	    var isOneHundredSeconds = function isOneHundredSeconds(time) {
	        return timeText === '100.0s';
	    };

	    //绘制
	    var draw = function draw(context) {
	        //获取定时器时间
	        timeTimer = timeTimer + deltaTime;

	        if (timeTimer >= 100) {
	            //毫秒数+ 0.1
	            timeNum = timeNum + 0.1;
	            timeText = timeNum.toFixed(1) + "s";

	            //如果100s
	            if (isOneHundredSeconds(timeText)) {
	                //偏移值改变
	                left = 100;
	            }

	            //求余数循环
	            timeTimer = timeTimer % 100;
	        }

	        //绘制文本
	        context.fillText(timeText, left, top);
	    };

	    return {
	        draw: draw,
	        gameOver: gameOver
	    };
	}

/***/ }
/******/ ]);