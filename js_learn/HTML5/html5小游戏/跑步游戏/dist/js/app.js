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

	'use strict';

	var _img_obj = __webpack_require__(1);

	var _img_obj2 = _interopRequireDefault(_img_obj);

	var _background = __webpack_require__(2);

	var _background2 = _interopRequireDefault(_background);

	var _run = __webpack_require__(3);

	var _run2 = _interopRequireDefault(_run);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//画布对象


	//背景方法
	var myCanvas = document.querySelector('#my-canvas');

	//index
	/**
	 * Created by chenxingyu on 2017/3/15.
	 */

	var context = myCanvas.getContext('2d');

	/**
	 *  将画布宽高设置到全局变量下
	 *  设置画布宽高
	 **/
	window.canWidth = myCanvas.width = 640;
	window.canHeight = myCanvas.height = document.documentElement.clientHeight;

	/**
	 *  初始化
	 *
	 **/

	// document.querySelector('#app').style.width = canWidth + 'px';
	// document.querySelector('#app').style.height = canHeight + 'px';

	//初始化一个首页背景
	var indexBg = (0, _background2.default)(_img_obj2.default.indexBg);
	var indexRun = (0, _run2.default)(_img_obj2.default.indexRun);

	//首页循环渲染
	var indexLoop = function indexLoop() {
	  window.setTimeout(indexLoop, 200);
	  //清除画布
	  context.clearRect(0, 0, canWidth, canHeight);
	  //绘制背景
	  indexBg.draw(context);

	  //绘制跑步
	  indexRun.draw(context, 640, 848);
	};

	indexLoop();

	console.log(indexLoop);

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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = backGround;
	/**
	 * Created by chenxingyu on 2017/3/15.
	 */

	function backGround(src) {
	    var bgPic = new Image();
	    //设置url
	    bgPic.src = src;

	    function draw(context) {
	        context.drawImage(bgPic, 0, 0, canWidth, canHeight); //向画布上绘制图像、画布或视频
	    }

	    return {
	        draw: draw
	    };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = run;
	/**
	 * Created by chenxingyu on 2017/3/15.
	 */

	function run(src) {
	    var index = 0; //保存index ， 用来切换动画
	    var runPic = new Image();

	    //设置url
	    runPic.src = src;

	    //向画布上绘制图像
	    function draw(context, width, height) {
	        //获取当前的index
	        index = (index + 1) % 4;

	        //保存当前环境的状态
	        context.save();
	        //偏移
	        context.translate(0, canHeight - height);
	        //绘制图片
	        context.drawImage(runPic, index * canWidth, 0, width, height, 0, 0, width, height);
	        //返回之前保存过的路径状态和属性
	        context.restore();
	    }

	    return {
	        draw: draw
	    };
	};

/***/ }
/******/ ]);