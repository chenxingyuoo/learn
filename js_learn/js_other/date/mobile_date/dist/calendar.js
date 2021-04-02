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

	var _zepto_learn = __webpack_require__(4);

	var _zepto_learn2 = _interopRequireDefault(_zepto_learn);

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _calendar_info = __webpack_require__(2);

	var _calendar_info2 = _interopRequireDefault(_calendar_info);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function nothing() {} /**
	                       * Created by chenxingyu on 2017/1/19.
	                       */

	var defaults = {
	    currYear: -1, // 当前年
	    currMonth: -1, // 当前月，0-11
	    calendarInit: nothing, //日历初始化回调
	    beforeDrawCld: nothing, // 画日历之前调用函数
	    afterDrawCld: nothing, // 画日历之后调用函数
	    dbClickDay: nothing, // 双击某一天执行事件
	    clickDay: nothing, // 单击某一天执行事件
	    callFunc: nothing // 调用函数
	};

	//构造函数
	function Calendar(options) {
	    this.options = options || {};
	    //是否切换月 否则切换每周
	    this.isSwitchMonth = true;
	    this.selection = {
	        currYear: -1,
	        currMonth: -1,

	        minYear: 1901,
	        maxYear: 2100,

	        tmpYear: -1,
	        tmpMonth: -1
	    };
	}

	//日历初始化
	Calendar.prototype.init = function init() {

	    this.calendarInfo = _calendar_info2.default;

	    //合并配置对象
	    this.setConfig();

	    var self = this;
	    function initCallback() {
	        //获取元素
	        self.getElement();

	        self.options.currYear = self.today.tY(); // 当前年
	        self.options.currMonth = self.today.tM(); // 当前月
	        self.options.currDay = self.today.tD(); // 当前日

	        //生成html
	        self.drawOutline(self.options);

	        //初始化顶部的工具栏
	        self.initControlBar();

	        //初始化selection对象
	        self.selectionInit();

	        //循环渲染日历
	        self.forEachDrawCldThree();

	        //回调函数
	        if (self.options.callFunc) {
	            self.options.callFunc();
	        }

	        //初始化日历客户端信息
	        self.dateClientInfoInit();

	        //绑定事件
	        self.bindEvent();
	    }

	    //获取今日
	    this.options.calendarInit(this, initCallback);
	};

	//合并配置对象
	Calendar.prototype.setConfig = function setConfig() {
	    this.options = _zepto_learn2.default.extend(defaults, this.options); // 扩展options选项
	};

	//获取元素
	Calendar.prototype.getElement = function getElement() {
	    var $date_wrap = (0, _zepto_learn2.default)('#date-wrap');
	    this.$date_wrap = $date_wrap;
	    this.$date_bar_box = $date_wrap.find('.date-bar-box');
	    this.$date_head = $date_wrap.find('.date-head');
	    this.$date_body_wrap = $date_wrap.find('.date-body-wrap');
	    this.$date_body_box = $date_wrap.find('.date-body-box');
	    this.$date_body_main = $date_wrap.find('.date-body-main');
	    this.$date_body_item = $date_wrap.find('.date-body-item');
	};

	//绑定事件
	Calendar.prototype.bindEvent = function bindEvent() {
	    var $doc = (0, _zepto_learn2.default)(document);

	    // 返回今天
	    $doc.on('click', '#today-btn', this.setToday.bind(this));

	    //上一月
	    $doc.on('click', '#prevMonth', this.goPrevMonth.bind(this));

	    //下一月
	    $doc.on('click', '#nextMonth', this.goNextMonth.bind(this));

	    //月份列表改变 ， 去某一月
	    $doc.on('change', '.month-list', function (event) {
	        var month = Number(event.currentTarget.value) - 1;
	        this.goMonth(month);
	    }.bind(this));

	    //上一年
	    $doc.on('click', '#prevYear', this.goPrevYear.bind(this));

	    //下一年
	    $doc.on('click', '#prevYear', this.goNextYear.bind(this));

	    //新年列表改变 , 去某一年
	    $doc.on('change', '.year-list', function (event) {
	        var year = Number(event.currentTarget.value);
	        this.goYear(year);
	    }.bind(this));

	    //点击日历事件
	    $doc.on('click', '.date-item', function (e) {
	        this.$date_body_main.find('.date-item').removeClass('active');
	        (0, _zepto_learn2.default)(e.currentTarget).addClass('active');

	        this.options.clickDay ? this.options.clickDay(this) : '';
	    }.bind(this));

	    /**
	     *  touch事件左右切换日历 ，切换上/下月
	     *
	     **/
	    $doc.on('touchstart', '.date-body-box', this.touchstartChangeMonth.bind(this));
	    $doc.on('touchmove', '.date-body-box', this.touchmoveChangeMonth.bind(this));
	    $doc.on('touchend', '.date-body-box', this.touchendChangeMonth.bind(this));

	    /**
	     * 向上向下拖动
	     *
	     **/
	    this.touchY = {};
	    this.touchY.min_move_size = 50;
	    this.touchY.max_move_size = this.dateClientInfo.dateHeight - this.dateClientInfo.dateHeadHeight - this.dateClientInfo.dateRowHeight;
	    this.touchY.move_size_y = 0;
	    this.touchY.now_top = 0;

	    $doc.on('touchstart', '.date-info', this.dateMoveUpDownStart.bind(this));
	    $doc.on('touchmove', '.date-info', function (e) {
	        //获取手指滑动到当前位置的x ， y坐标
	        var move_x = parseInt(e.touches[0].screenX);
	        var move_y = parseInt(e.touches[0].screenY);

	        var self = this;

	        window.requestAnimFrame(function () {
	            self.dateMoveUpDownMove(e, move_x, move_y);
	        });
	    }.bind(this));
	    $doc.on('touchend', '.date-info', this.dateMoveUpDownEnd.bind(this));

	    /**
	     * 切换每周
	     *
	     **/
	    // this.touchRowDataX = {};
	    // this.touchRowDataX.min_move_size = 50;
	    // this.touchRowDataX.move_size_x = 0;
	    // this.touchRowDataX.now_left = 0;
	    // this.touchRowDataX.index = todayIndex;
	    //
	    //
	    // $doc.on('touchstart','.date-body-item',function (e){
	    //     // debugger;
	    //     e.stopPropagation();
	    //     e.preventDefault();
	    //
	    //     if (this.isSwitchMonth === true) {
	    //         return;
	    //     }
	    //
	    //     var style = $('.date-body-item').eq(1).css('transform');
	    //
	    //     this.touchRowDataX.now_left = Number(style.slice(style.indexOf('(') + 1,style.indexOf(',')).replace(/px/,''));
	    //
	    //     this.touchRowDataX.point_x = this.touchRowDataX.start_x = parseInt(e.touches[0].screenX);
	    //
	    // }.bind(this));
	    //
	    // $doc.on('touchmove','.date-body-item',function (e){
	    //     e.stopPropagation();
	    //     e.preventDefault();
	    //
	    //     if (this.isSwitchMonth === true) {
	    //         return;
	    //     }
	    //
	    //     var self = this;
	    //     //获取手指滑动到当前位置的x ， y坐标
	    //     var move_x = parseInt(e.touches[0].screenX);
	    //     var move_y = parseInt(e.touches[0].screenY);
	    //
	    //     //移动的x值减去 触摸时的 x值
	    //     var changeX = move_x - (self.touchRowDataX.point_x === null ? move_x : self.touchRowDataX.point_x);  //需要判断move_start的值？
	    //     //移动的y值减去 触摸时的 y值
	    //     var changeY = move_y - (self.touchY.point_y === null ? move_y : self.touchY.point_y);
	    //     var notPreventDefault = false;
	    //     var sin = changeY / Math.sqrt(changeX * changeX + changeY * changeY);
	    //
	    //     if (sin > Math.sin(Math.PI / 3) || sin < -Math.sin(Math.PI / 3)) {//滑动屏幕角度范围：PI/3  -- 2PI/3
	    //         notPreventDefault = true;  //不阻止默认行为
	    //     }
	    //
	    //     self.touchRowDataX.now_left = self.touchRowDataX.now_left + changeX;  //现在x坐标的位置
	    //
	    //     self.touchRowDataX.is_move_left = move_x - self.touchRowDataX.start_x < 0;  //是否向左移动
	    //
	    //     self.touchRowDataX.point_x = move_x;
	    //
	    //     $('.date-body-item').eq(1).css(this.translateX(2, self.touchRowDataX.now_left));
	    //
	    //     return notPreventDefault;
	    //
	    // }.bind(this));
	    //
	    // $doc.on('touchend','.date-body-item',function (e){
	    //     e.stopPropagation();
	    //     e.preventDefault();
	    //     console.log(1);
	    //
	    //     var self = this;
	    //
	    //     if (self.touchRowDataX.is_move_left) {
	    //
	    //     }
	    // });
	};

	//日历客户端信息初始化
	Calendar.prototype.dateClientInfoInit = function dateClientInfoInit() {
	    this.dateClientInfo = {
	        dateHeight: this.$date_wrap.height(),
	        dateHeadHeight: this.$date_bar_box.height() + this.$date_head.height(),
	        dateBodyHeight: this.$date_body_wrap.height(),
	        dateRowHeight: 51,
	        todayIndex: (0, _zepto_learn2.default)('.today').closest('.date-row-item').index()
	    };

	    this.dateClientInfo.todayHeight = this.dateClientInfo.todayIndex * this.dateClientInfo.dateRowHeight;
	};

	//向上下滑动 touchstart 处理函数
	Calendar.prototype.dateMoveUpDownStart = function dateMoveUpDownStart(e) {
	    this.touchY.point_y = this.touchY.start_y = parseInt(e.touches[0].screenY);
	};

	//向上下滑动 touchmove 处理函数
	Calendar.prototype.dateMoveUpDownMove = function dateMoveUpDownMove(e, move_x, move_y) {
	    var self = this;
	    //移动的x值减去 触摸时的 x值
	    var changeX = move_x - (self.touchY.point_x === null ? move_x : self.touchY.point_x); //需要判断move_start的值？
	    //移动的y值减去 触摸时的 y值
	    var changeY = move_y - (self.touchY.point_y === null ? move_y : self.touchY.point_y);
	    var notPreventDefault = false;
	    var sin = changeY / Math.sqrt(changeX * changeX + changeY * changeY);

	    if (sin > Math.sin(Math.PI / 3) || sin < -Math.sin(Math.PI / 3)) {
	        //滑动屏幕角度范围：PI/3  -- 2PI/3
	        notPreventDefault = true; //不阻止默认行为
	    }

	    self.touchY.now_top = self.touchY.now_top + changeY; //现在y坐标的位置
	    self.touchY.is_move_top = move_y - self.touchY.start_y < 0; //是否向上移动

	    self.touchY.point_y = move_y;

	    if (self.touchY.now_top > self.touchY.max_move_size) {
	        self.touchY.now_top = self.touchY.max_move_size;
	    } else if (self.touchY.now_top < -self.touchY.max_move_size) {
	        self.touchY.now_top = -self.touchY.max_move_size;
	    } else if (self.touchY.now_top > 0) {
	        self.touchY.now_top = 0;
	    }

	    //清除切换每周的样式
	    // var $date_body_item = $('.date-body-item').eq(1);
	    // if ($date_body_item.hasClass('display-box')) {
	    //     $date_body_item.removeClass('display-box');
	    //     $date_body_item.attr('style', '');
	    // }

	    var top = self.touchY.now_top;

	    //设置该盒子的偏移样式
	    (0, _zepto_learn2.default)(e.currentTarget).css(self.translateY(2, top));

	    //设置偏移样式
	    if (self.touchY.max_move_size + top < this.dateClientInfo.todayHeight) {
	        var y = top + this.dateClientInfo.dateRowHeight;
	        self.$date_body_box.css(self.translateY(2, y));
	    }

	    return notPreventDefault;
	};

	//向上下滑动 touchend 处理函数
	Calendar.prototype.dateMoveUpDownEnd = function dateMoveUpDownEnd(e) {
	    var top;
	    if (this.touchY.is_move_top) {
	        if (this.touchY.now_top <= -this.touchY.min_move_size) {
	            top = -this.touchY.max_move_size;
	            this.isSwitchMonth = false;
	        } else {
	            top = 0;
	            this.isSwitchMonth = true;
	        }
	    } else {
	        if (this.touchY.now_top >= -(this.touchY.max_move_size - this.touchY.min_move_size)) {
	            top = 0;
	            this.isSwitchMonth = true;
	        } else {
	            top = -this.touchY.max_move_size;
	            this.isSwitchMonth = false;
	        }
	    }

	    //设置top值
	    this.touchY.now_top = top;

	    //设置该盒子的偏移样式
	    (0, _zepto_learn2.default)(e.currentTarget).css(this.translateY(1, top));

	    var y;
	    if (top === 0) {
	        y = 0;
	    } else {
	        //设置切换每周的样式
	        // setTimeout(function(){
	        //     // debugger;
	        //     $('.date-body-item').eq(1).addClass('display-box');
	        //     $('.date-body-item').eq(1).css(this.translateX(2, -($('.date-body-item').eq(1).width() * (todayIndex))));
	        //
	        //     $('.date-body-box').attr('style','');
	        // }.bind(this),400);

	        y = top + this.dateClientInfo.dateRowHeight;
	    }
	    this.$date_body_box.css(this.translateY(1, y));
	};

	/**
	 * 获取动画样式，要兼容更多浏览器，可以扩展该方法
	 * @int fig : 1 动画  2 没动画
	 * return object
	 **/
	Calendar.prototype.translateY = function translateY(fig, y) {
	    var time = fig == 1 ? 500 : 0;
	    return {
	        '-webkit-transition': '-webkit-transform ' + time + 'ms ease',
	        'transition': 'transform ' + time + 'ms ease',
	        '-webkit-transform': 'translate3d(0,' + y + 'px,0)',
	        'transform': 'translate3d(0,' + y + 'px,0)'
	    };
	};

	Calendar.prototype.translateX = function translateX(fig, x) {
	    var time = fig == 1 ? 500 : 0;
	    return {
	        '-webkit-transition': '-webkit-transform ' + time + 'ms ease',
	        'transition': 'transform ' + time + 'ms ease',
	        '-webkit-transform': 'translate3d(' + x + 'px, 0 ,0)',
	        'transform': 'translate3d(' + x + 'px, 0, 0)'
	    };
	};

	//touchstart 切换月份处理程序
	Calendar.prototype.touchstartChangeMonth = function (e) {
	    // if (this.isSwitchMonth === false) {
	    //     return;
	    // }

	    var touch = e.changedTouches[0];
	    var px = touch.pageX;
	    var py = touch.pageY;
	    this.touchData = {};
	    this.touchData.startX = px;
	    this.touchData.startY = py;
	    this.touchData.startTime = new Date().getTime();
	};

	//touchmove 切换月份处理程序
	Calendar.prototype.touchmoveChangeMonth = function (e) {
	    // if (this.isSwitchMonth === false) {
	    //     return;
	    // }
	    var touch = e.changedTouches[0];
	    var px = touch.pageX;
	    var py = touch.pageY;
	    var distX = Math.abs(px - this.touchData.startX);
	    var distY = Math.abs(py - this.touchData.startY);
	    if (distX < 10 && distY < 10) {
	        return;
	    } else if (distY > distX + 5) {
	        return;
	    }
	    e.preventDefault();
	    // debugger;
	    var _distX = px - this.touchData.startX;
	    var curX;
	    var newX;
	    curX = -this.$date_body_box.width();
	    newX = curX + _distX;
	    this.$date_body_main[0].style.webkitTransform = 'translate3d(' + newX + 'px, 0 , 0)';
	};

	//touchend 切换月份处理程序
	Calendar.prototype.touchendChangeMonth = function (e) {
	    // if (this.isSwitchMonth === false) {
	    //     return;
	    // }

	    var self = this;
	    var touch = e.changedTouches[0];
	    var time = self.scrollTime || 500;
	    var startTime = this.touchData.startTime;
	    var endTime = new Date().getTime();
	    var px = touch.pageX;
	    var distX = Math.abs(px - this.touchData.startX);
	    var _distX = px - this.touchData.startX;
	    var scroll_w = this.$date_body_box.width();

	    var dist;
	    if (distX > scroll_w / 2.5 || endTime - startTime < 300 && distX > 60) {
	        if (_distX < 0) {
	            dist = -scroll_w * 2;
	        } else {
	            dist = 0;
	        }

	        //重新渲染
	        setTimeout(function () {

	            if (_distX < 0) {
	                self.nextMonth();
	            } else {
	                self.prevMonth();
	            }

	            self.options.currYear = self.selection.currYear;
	            self.options.currMonth = self.selection.currMonth;

	            //刷新顶部的工具栏
	            self.freshControlBar();

	            self.drawOutline(self.options);

	            //循环渲染日历
	            self.forEachDrawCldThree();
	        }, time);
	    } else {
	        dist = -scroll_w;
	    }

	    //过度动画
	    if (distX > 10) {
	        var dateBodyMain = this.$date_body_main[0];
	        dateBodyMain.style.webkitTransitionDuration = time + 'ms';
	        dateBodyMain.style.webkitTransform = 'translate3d(' + dist + 'px, 0, 0)';
	        setTimeout(function () {
	            dateBodyMain.style.webkitTransitionDuration = '0ms';
	        }, time);
	    }
	};

	//循环渲染3个
	Calendar.prototype.forEachDrawCldThree = function forEachDrawCldThree() {
	    var currYear;
	    var currMonth;
	    var $curdateBodyItem;
	    var year;
	    var beforeDrawCldFn;
	    var afterDrawCldFn;

	    for (var i = 0, len = 3; i < len; i++) {
	        afterDrawCldFn = null;
	        beforeDrawCldFn = null;
	        //上一个月
	        if (i === 0) {
	            currMonth = this.options.currMonth - 1;
	            currYear = this.options.currYear;
	            if (currMonth === -1) {
	                year = this.selection.currYear - 1;
	                if (year >= this.selection.minYear) {
	                    currMonth = 11;
	                    currYear = this.options.currYear - 1;
	                } else {
	                    currMonth = 0;
	                }
	            }

	            //开始绘画日历之前回调函数
	            beforeDrawCldFn = this.options.beforeDrawCld;
	        }
	        //当前月
	        else if (i === 1) {

	                currMonth = this.options.currMonth;
	                currYear = this.options.currYear;

	                afterDrawCldFn = this.options.afterDrawCld;

	                //设置偏移样式
	                this.$date_body_main.attr({
	                    'style': '-webkit-transform:translate3d(' + -this.$date_body_box.width() + 'px, 0, 0)'
	                });
	            }
	            //下一月
	            else if (i === 2) {
	                    currYear = this.options.currYear;
	                    currMonth = this.options.currMonth + 1;

	                    if (currMonth > 11) {
	                        year = this.selection.currYear + 1;
	                        if (year <= this.selection.maxYear) {
	                            currMonth = 0;
	                            currYear = this.options.currYear + 1;
	                        } else {
	                            currMonth = 0;
	                        }
	                    }
	                }

	        //获取盒子
	        $curdateBodyItem = this.$date_body_item.eq(i);
	        //绘制
	        this.drawCld($curdateBodyItem, currYear, currMonth, beforeDrawCldFn, afterDrawCldFn);
	    }
	};

	//初始化selection对象
	Calendar.prototype.selectionInit = function selectionInit(year, month) {
	    if (year === undefined || month === undefined) {
	        year = this.options.currYear;
	        month = this.options.currMonth;
	    }

	    this.setYear(year);
	    this.setMonth(month);
	};

	//设置年
	Calendar.prototype.setYear = function setYear(year) {
	    if (this.selection.tmpYear == -1 && this.selection.currYear != -1) {
	        this.selection.tmpYear = this.selection.currYear;
	    }
	    this.selection.currYear = year;
	};

	//设置月
	Calendar.prototype.setMonth = function setMonth(month) {
	    if (this.selection.tmpMonth == -1 && this.selection.currMonth != -1) {
	        this.selection.tmpMonth = this.selection.currMonth;
	    }
	    this.selection.currMonth = month;
	};

	//今天处理函数
	Calendar.prototype.setToday = function today() {
	    var today = new Date();
	    var year = today.getFullYear();
	    var month = today.getMonth();

	    if (this.selection.currYear != year || this.selection.currMonth != month) {
	        if (this.selection.tmpYear == year && this.selection.tmpMonth == month) {
	            this.rollback();
	        } else {
	            this.init(year, month);
	            this.commit();
	        }
	    }
	};

	//上一月处理函数
	Calendar.prototype.prevMonth = function prevMonth() {
	    // debugger;
	    var month = this.selection.currMonth - 1;
	    if (month === -1) {
	        var year = this.selection.currYear - 1;
	        if (year >= this.selection.minYear) {
	            month = 11;
	            this.setYear(year);
	        } else {
	            month = 0;
	        }
	    }
	    this.setMonth(month);
	};

	//下一页处理函数
	Calendar.prototype.nextMonth = function nextMonth() {
	    var month = this.selection.currMonth + 1;
	    if (month == 12) {
	        var year = this.selection.currYear + 1;
	        if (year <= this.selection.maxYear) {
	            month = 0;
	            this.setYear(year);
	        } else {
	            month = 11;
	        }
	    }
	    this.setMonth(month);
	};

	//上一年处理函数
	Calendar.prototype.prevYear = function prevYear() {
	    var year = this.selection.currYear - 1;
	    if (year >= this.selection.minYear) {
	        this.setYear(year);
	    }
	};

	//下一年处理函数
	Calendar.prototype.nextYear = function nextYear() {
	    var year = this.selection.currYear + 1;
	    if (year <= this.selection.maxYear) {
	        this.setYear(year);
	    }
	};

	//selection 回到刚开始的状态
	Calendar.prototype.rollback = function rollback() {
	    if (this.selection.tmpYear != -1) {
	        this.setYear(this.selection.tmpYear);
	    }
	    if (this.selection.tmpMonth != -1) {
	        this.setMonth(this.selection.tmpMonth);
	    }
	    this.selection.tmpYear = -1;
	    this.selection.tmpMonth = -1;
	};

	//提交更改
	Calendar.prototype.commit = function commit() {
	    // debugger;
	    if (this.selection.tmpYear != -1 || this.selection.tmpMonth != -1) {
	        // 如果发生了变化
	        if (this.selection.currYear !== this.selection.tmpYear || this.selection.currMonth !== this.selection.tmpMonth) {

	            // 执行某操作
	            this.changeView();

	            this.freshControlBar();
	        }

	        this.selection.tmpYear = -1;
	        this.selection.tmpMonth = -1;
	    }
	};

	/**
	 * 清除日历数据
	 */
	Calendar.prototype.clear = function clear() {

	    (0, _zepto_learn2.default)('.solar-calendar').html('');
	    (0, _zepto_learn2.default)('.lunar-calendar').html('');

	    for (var i = 0; i < 42; i++) {
	        (0, _zepto_learn2.default)("#SD" + i).html(''); // 清除阳历
	        (0, _zepto_learn2.default)("#LD" + i).html(''); // 清除农历
	        // 清除相关class
	        var gd = (0, _zepto_learn2.default)("#GD" + i);
	        if (gd.hasClass('weekend')) {
	            gd.removeAttr('data-solor class').addClass('weekend');
	        } else {
	            gd.removeAttr('data-solor class');
	        }
	    }
	};

	/**
	 * 重新画日历
	 * @return {[type]} [description]
	 */
	Calendar.prototype.changeView = function changeView() {
	    // debugger;
	    this.options.currYear = this.selection.currYear;
	    this.options.currMonth = this.selection.currMonth;
	    this.clear();
	    this.forEachDrawCldThree();
	    // this.drawCld(this.options.currYear, this.options.currMonth, this.options.afterDrawCld);
	};

	/**
	 * 刷新工具栏
	 */
	Calendar.prototype.freshControlBar = function freshControlBar() {
	    // debugger;
	    // 设置当前选中的年
	    var $year_list = (0, _zepto_learn2.default)('.year-list');
	    $year_list.find('option').eq($year_list[0].selectedIndex).prop('selected', false);
	    $year_list.find('option[value="' + this.options.currYear + '"]').prop('selected', true);

	    // 设置当前选中的月
	    var $month_list = (0, _zepto_learn2.default)('.month-list');
	    var month = this.options.currMonth + 1; // 实际月
	    $month_list.find('option').eq($month_list[0].selectedIndex).prop('selected', false);
	    $month_list.find('option[value="' + month + '"]').prop('selected', true);
	};

	//去到今天
	Calendar.prototype.goToday = function goToday() {
	    this.today();
	};

	//去到某一年
	Calendar.prototype.goYear = function goYear(year) {
	    this.setYear(year);
	    this.commit();
	};

	//去到某一月
	Calendar.prototype.goMonth = function (month) {
	    this.setMonth(month);
	    this.commit();
	};

	//去上一年
	Calendar.prototype.goPrevYear = function goPrevYear() {
	    this.prevYear();
	    this.commit();
	};

	//去上一年
	Calendar.prototype.goNextYear = function goNextYear() {
	    this.nextYear();
	    this.commit();
	};

	//去上一月
	Calendar.prototype.goPrevMonth = function goPrevMonth() {
	    this.prevMonth();
	    this.commit();
	};

	//去下一月
	Calendar.prototype.goNextMonth = function goNextMonth() {
	    this.nextMonth();
	    this.commit();
	};

	/**
	 * 生成html 画表格轮廓
	 * @return null
	 */
	Calendar.prototype.drawOutline = function drawOutline(opts) {
	    // opts = opts || {};
	    // var self = this;
	    // debugger;
	    var $dateHead = (0, _zepto_learn2.default)('.date-head');
	    var $dateBodyItem = (0, _zepto_learn2.default)('.date-body-item');

	    for (var item = 0, len = 3; item < len; item++) {
	        var html = '';
	        var $curDateBodyItem = $dateBodyItem.eq(item);
	        for (var i = 0; i < 5; i++) {
	            // flex-center flex-wrap
	            html = html + '<div class="date-row-item display-box">';
	            for (var j = 0; j < 7; j++) {
	                // debugger;

	                var className = '';

	                if (j === 0 || j === 6) {
	                    className = 'weekend';
	                }

	                html = html + '<div class="date-item box1-column-center ' + className + '">' + '<span class="marketing-tips"></span>' +
	                // '<div class="layer"></div>' +
	                // '<span class="border"></span>' +
	                '<span class="solar solar-calendar"></span>' + '<span class="lunar lunar-calendar"></span>' + '</div>';
	            }
	            html = html + '</div>';
	        }

	        $curDateBodyItem.html(html);
	    }
	};

	/**
	 * 初始化顶部的工具栏
	 */
	Calendar.prototype.initControlBar = function initControlBar() {
	    var i;
	    // 设置选中的年为当前的年
	    var tY = this.today.tY();
	    var htmlYear = '';
	    for (i = 1901; i <= 2100; i++) {
	        if (i == tY) htmlYear = htmlYear + '<option value="' + i + '" selected="selected">' + i + '年</option>';else {
	            htmlYear = htmlYear + '<option value="' + i + '">' + i + '年</option>';
	        }
	    }

	    // 设置月的选项
	    var tM = this.today.tM() + 1;
	    var htmlMonth = "";
	    for (i = 1; i <= 12; i++) {
	        if (i == tM) htmlMonth += '<option value="' + i + '" selected="selected">' + i + '月</option>';else {
	            htmlMonth += '<option value="' + i + '">' + i + '月</option>';
	        }
	    }

	    //渲染
	    (0, _zepto_learn2.default)(".year-list").html(htmlYear);
	    (0, _zepto_learn2.default)(".month-list").html(htmlMonth);
	};

	/**
	 * 返回本月的所有数据
	 * @param  int y 年
	 * @param  int m 月
	 * @return object 每一天的数据列表
	 */
	Calendar.prototype.calendar = function calendar(y, m) {

	    var sDObj,
	        lDObj,
	        lY,
	        lM,
	        lD = 1,
	        lL,
	        lX = 0,
	        tmp1,
	        tmp2,
	        lM2,
	        lY2,
	        lD2,
	        tmp3,
	        dayglus,
	        bsg,
	        xs,
	        xs1,
	        fs,
	        fs1,
	        cs,
	        cs1;
	    var cY, cM, cD; //年柱,月柱,日柱
	    var lDPOS = new Array(3);
	    var n = 0;
	    var firstLM = 0;
	    var _this = {}; // 日历对象

	    sDObj = new Date(y, m, 1, 0, 0, 0, 0); //当月一日日期

	    _this.length = this.solarDays(y, m); //公历当月天数
	    _this.firstWeek = sDObj.getDay(); //公历当月1日星期几

	    //年柱 1900年立春后为庚子年(60进制36)
	    var cyNum;
	    if (m < 2) {
	        cyNum = y - 1900 + 36 - 1;
	    } else {
	        cyNum = y - 1900 + 36;
	    }
	    cY = this.cyclical(cyNum);

	    var term2 = this.sTerm(y, 2); //立春日期

	    //月柱 1900年1月小寒以前为 丙子月(60进制12)
	    var firstNode = this.sTerm(y, m * 2); //返回当月「节」为几日开始
	    cM = this.cyclical((y - 1900) * 12 + m + 12);

	    lM2 = (y - 1900) * 12 + m + 12;

	    //当月一日与 1900/1/1 相差天数
	    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
	    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

	    for (var i = 0; i < _this.length; i++) {
	        // debugger;
	        if (lD > lX) {
	            sDObj = new Date(y, m, i + 1); //当月一日日期
	            lDObj = this.lunar(sDObj); //农历对象
	            lY = lDObj.year; //农历年
	            lM = lDObj.month; //农历月
	            lD = lDObj.day; //农历日
	            lL = lDObj.isLeap; //农历是否闰月
	            lX = lL ? this.leapDays(lY) : this.monthDays(lY, lM); //农历当月最后一天

	            if (n == 0) {
	                firstLM = lM;
	            }

	            lDPOS[n++] = i - lD + 1;
	        }

	        //依节气调整二月分的年柱, 以立春为界
	        if (m == 1 && i + 1 == term2) {
	            cY = this.cyclical(y - 1900 + 36);
	            lY2 = y - 1900 + 36;
	        }
	        //依节气月柱, 以「节」为界
	        if (i + 1 == firstNode) {
	            cM = this.cyclical((y - 1900) * 12 + m + 13);
	            lM2 = (y - 1900) * 12 + m + 13;
	        }

	        //日柱
	        cD = this.cyclical(dayCyclical + i);
	        lD2 = dayCyclical + i;

	        //获取日历属性
	        _this[i] = this.calElement(y, m + 1, i + 1, _calendar_info2.default.nStr1[(i + _this.firstWeek) % 7], lY, lM, lD++, lL, cY, cM, cD);

	        // 获取黄历的禁忌
	        _this[i].sgz5 = this.calConv2(lY2 % 12, lM2 % 12, lD2 % 12, lY2 % 10, lD2 % 10, lM, lD - 1, m + 1, cs1);
	        _this[i].sgz3 = this.cyclical6(lM2 % 12, lD2 % 12);
	    }

	    // debugger;
	    //节气
	    tmp1 = this.sTerm(y, m * 2) - 1;
	    tmp2 = this.sTerm(y, m * 2 + 1) - 1;
	    // 二十四节气表
	    _this[tmp1].solarTerms = _calendar_info2.default.solarTerm[m * 2];
	    _this[tmp2].solarTerms = _calendar_info2.default.solarTerm[m * 2 + 1];
	    if (m == 3) _this[tmp1].color = 'red'; //清明颜色

	    //国历节日
	    for (i in _calendar_info2.default.sFtv) {
	        if (_util2.default.type(_calendar_info2.default.sFtv[i]) == 'string' && _calendar_info2.default.sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) if (Number(RegExp.$1) == m + 1) {
	            _this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + '  ';
	            if (RegExp.$3 == '*') {
	                _this[Number(RegExp.$2) - 1].color = 'red';
	            }
	        }
	    }

	    //营销日
	    for (i in this.calendarInfo.yFtv) {
	        if (_util2.default.type(this.calendarInfo.yFtv[i]) == 'string' && this.calendarInfo.yFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) if (Number(RegExp.$1) == m + 1) {
	            _this[Number(RegExp.$2) - 1].yingFestival += RegExp.$4 + '  ';
	            if (RegExp.$3 == '*') {
	                _this[Number(RegExp.$2) - 1].color = '#f0f';
	            }
	        }
	    }

	    //农历节日
	    for (i in _calendar_info2.default.lFtv) {
	        if (_util2.default.type(_calendar_info2.default.lFtv[i]) == 'string' && _calendar_info2.default.lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
	            tmp1 = Number(RegExp.$1) - firstLM;
	            if (tmp1 == -11) {
	                tmp1 = 1;
	            }
	            if (tmp1 >= 0 && tmp1 < n) {
	                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
	                if (tmp2 >= 0 && tmp2 < _this.length) {
	                    _this[tmp2].lunarFestival += RegExp.$4 + '  ';
	                    if (RegExp.$3 == '*') {
	                        _this[tmp2].color = 'red';
	                    }
	                }
	            }
	        }
	    }

	    //黑色星期五
	    // if ((_this.firstWeek + 12) % 7 == 5) {
	    //     _this[12].solarFestival += '黑色星期五';
	    // }

	    //今日
	    if (y == this.today.tY() && m == this.today.tM()) {
	        _this[this.today.tD() - 1].isToday = true;
	    }

	    return _this;
	};

	/**
	 * 画每月的日历
	 * @param  int year 年
	 * @param  int month 月
	 * @param  function funct 操作完后执行的函数
	 * @return null
	 */
	Calendar.prototype.drawCld = function drawCld($elBox, year, month, beforeDrawCldFn, afterDrawCldFn) {
	    var i;
	    var sD;
	    var s;
	    var cld;

	    if (beforeDrawCldFn) {
	        beforeDrawCldFn(this);
	    }

	    debugger;
	    cld = this.calendar(year, month);
	    this.cld = cld;

	    // var $dateBodyItem = $(".date-body-item").eq(0);


	    for (i = 0; i < 42; i++) {
	        // debugger;
	        var $curDateItem = $elBox.find('.date-item').eq(i);
	        var $solarCalendar = $curDateItem.find('.solar-calendar');
	        var $lunarCalendar = $curDateItem.find('.lunar-calendar');

	        sD = i - cld.firstWeek;

	        if (sD > -1 && sD < cld.length) {
	            //日期内
	            $solarCalendar.text(sD + 1);
	            $curDateItem.attr({
	                'data-solor': sD + 1, // 设置阳历日
	                'data-month': month + 1, // 设置阳历月
	                'data-year': year // 设置阳历年
	            });

	            if (cld[sD].isToday) {
	                // 今日
	                this.todayInfo = cld[sD];
	                $curDateItem.addClass("today"); //今日颜色
	                // this.showAlmanacDetail(eDay);   // 显示右侧黄历
	            }

	            if (cld[sD].lDay == 1) {
	                //显示农历月
	                $lunarCalendar.html('<b>' + (cld[sD].isLeap ? '闰' : '') + _calendar_info2.default.chineseMonth[cld[sD].lMonth] + '月' + '</b>');
	            } else {
	                $lunarCalendar.text(this.cDay(cld[sD].lDay));
	            }

	            // debugger;

	            s = cld[sD].yingFestival;

	            if (s.length > 0) {
	                $curDateItem.addClass('marketing-day');
	            } else {

	                s = cld[sD].lunarFestival;

	                //农历节日
	                if (s.length > 0) {
	                    if (s.length > 8) {
	                        s = s.substr(0, 5) + '...';
	                    }
	                    $curDateItem.addClass('lunar-style');
	                }
	                //国历节日
	                else {
	                        s = cld[sD].solarFestival;
	                        if (s.length > 0) {
	                            if (s.length > 8) {
	                                s = s.substr(0, 5) + '...';
	                            }
	                            s == '黑色星期五' ? $curDateItem.addClass('black-style') : $curDateItem.addClass('solar-style');
	                        }
	                        //廿四节气
	                        else {
	                                s = cld[sD].solarTerms;
	                                if (s.length > 0) $curDateItem.addClass('lunar-style');
	                                // if (s.length > 0)  s = s.fontcolor('limegreen');
	                            }
	                    }
	            }

	            if (cld[sD].solarTerms == '清明') {
	                s = '清明节'.fontcolor('red');
	            }
	            if (cld[sD].solarTerms == '芒种') {
	                s = '芒种'.fontcolor('red');
	            }
	            if (cld[sD].solarTerms == '夏至') {
	                s = '夏至'.fontcolor('red');
	            }
	            if (cld[sD].solarTerms == '冬至') {
	                s = '冬至'.fontcolor('red');
	            }

	            if (s.length > 0) {
	                $lunarCalendar.html(s);
	            }
	        }
	    }

	    //如果存在函数则执行函数
	    if (afterDrawCldFn) {
	        afterDrawCldFn(this);
	    }
	};

	/**
	 * 今日
	 */
	Calendar.prototype.today = {
	    date: new Date(),
	    tY: function tY() {
	        return this.date.getFullYear();
	    },
	    tM: function tM() {
	        return this.date.getMonth();
	    },
	    tD: function tD() {
	        return this.date.getDate();
	    }
	};

	/**
	 * 返回农历 y年的总天数
	 * @param  int y 年
	 * @return int
	 */
	Calendar.prototype.lYearDays = function lYearDays(y) {
	    var i,
	        sum = 348;
	    for (i = 0x8000; i > 0x8; i >>= 1) {
	        sum = sum + (_calendar_info2.default.lunarInfo[y - 1900] & i ? 1 : 0);
	    }
	    return sum + this.leapDays(y);
	};

	/**
	 * 返回农历 y年闰月的天数
	 * @param  int y 年
	 * @return int
	 */
	Calendar.prototype.leapDays = function leapDays(y) {
	    if (this.leapMonth(y)) {
	        return (_calendar_info2.default.lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29;
	    } else {
	        return 0;
	    }
	};

	/**
	 * 返回农历 y年闰哪个月 1-12 , 没闰返回 0
	 * @param  int y 年
	 * @return int
	 */

	Calendar.prototype.leapMonth = function leapMonth(y) {
	    var lm = _calendar_info2.default.lunarInfo[y - 1900] & 0xf;
	    return lm == 0xf ? 0 : lm;
	};

	/**
	 * 农历 y年m月的总天数
	 * @param  int y 年
	 * @param  imt m 月
	 * @return int y年m月的总天数
	 */
	Calendar.prototype.monthDays = function monthDays(y, m) {
	    return _calendar_info2.default.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
	};

	/**
	 * 算出农历, 传入日期控件, 返回农历日期控件
	 * 该控件属性有 .year .month .day .isLeap
	 */
	Calendar.prototype.lunar = function lunar(objDate) {
	    var i,
	        leap,
	        temp = 0,
	        _this = {};
	    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

	    for (i = 1900; i < 2100 && offset > 0; i++) {
	        temp = this.lYearDays(i);
	        offset = offset - temp;
	    }

	    if (offset < 0) {
	        offset = offset + temp;
	        i = i - 1;
	    }

	    _this.year = i;

	    leap = this.leapMonth(i); //闰哪个月
	    _this.isLeap = false;

	    for (i = 1; i < 13 && offset > 0; i++) {
	        //闰月
	        if (leap > 0 && i == leap + 1 && _this.isLeap == false) {
	            i = i - 1;
	            _this.isLeap = true;
	            temp = this.leapDays(_this.year);
	        } else {
	            temp = this.monthDays(_this.year, i);
	        }

	        //解除闰月
	        if (_this.isLeap == true && i == leap + 1) {
	            _this.isLeap = false;
	        }

	        offset = offset - temp;
	    }

	    if (offset == 0 && leap > 0 && i == leap + 1) if (_this.isLeap) {
	        _this.isLeap = false;
	    } else {
	        _this.isLeap = true;
	        i = i - 1;
	    }

	    if (offset < 0) {
	        offset = offset + temp;
	        i = i - 1;
	    }

	    _this.month = i;
	    _this.day = offset + 1;
	    return _this;
	};

	/**
	 * 将日期格式化中文日期
	 * @param  int m 月
	 * @return string
	 */
	Calendar.prototype.cDay = function cDay(d) {
	    var s;
	    // debugger;
	    switch (d) {
	        case 10:
	            s = '初十';
	            break;
	        case 20:
	            s = '二十';
	            break;
	        case 30:
	            s = '三十';
	            break;
	        default:
	            s = _calendar_info2.default.nStr2[Math.floor(d / 10)];
	            s = s + _calendar_info2.default.nStr1[d % 10];
	        // console.log(s);
	    }
	    return s;
	};

	/**
	 * 返回公历 y年某m+1月的天数
	 */
	Calendar.prototype.solarDays = function solarDays(y, m) {
	    if (m == 1) {
	        return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
	    } else {
	        return _calendar_info2.default.solarMonth[m];
	    }
	};

	/**
	 * 传入 offset 返回干支, 0=甲子
	 */
	Calendar.prototype.cyclical = function cyclical(num) {
	    return _calendar_info2.default.gan[num % 10] + _calendar_info2.default.zhi[num % 12];
	};

	/**
	 * 日历属性
	 *
	 * @param  int sYear  公元年4位数字
	 * @param  int sMonth 公元月数字
	 * @param  int sDay   公元日数字
	 * @param  string  week   星期, 1个中文
	 * @param  int  lYear  公元年4位数字
	 * @param  int  lMonth 农历月数字
	 * @param  int  lDay   农历日数字
	 * @param  bool isLeap 是否为农历闰月
	 * @param  string  cYear  年柱, 2个中文
	 * @param  string  cMonth 月柱, 2个中文
	 * @param  string  cDay   日柱, 2个中文
	 * @return object
	 */

	Calendar.prototype.calElement = function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {
	    return {
	        isToday: false,
	        //公历
	        sYear: sYear, //公元年4位数字
	        sMonth: sMonth, //公元月数字
	        sDay: sDay, //公元日数字
	        week: week, //星期, 1个中文
	        //农历
	        lYear: lYear, //公元年4位数字
	        lMonth: lMonth, //农历月数字
	        lDay: lDay, //农历日数字
	        isLeap: isLeap, //是否为农历闰月?
	        //八字
	        cYear: cYear, //年柱, 2个中文
	        cMonth: cMonth, //月柱, 2个中文
	        cDay: cDay, //日柱, 2个中文

	        color: '',

	        lunarFestival: '', //农历节日
	        solarFestival: '', //公历节日
	        yingFestival: '', //营销日
	        solarTerms: '' //节气
	    };
	};

	/**
	 * 某年的第n个节气为几日(从0小寒起算)
	 * @param  int y 年
	 * @param  int n 月
	 * @return date
	 */
	Calendar.prototype.sTerm = function sTerm(y, n) {
	    var offDate = new Date(31556925974.7 * (y - 1900) + _calendar_info2.default.sTermInfo[n] * 60000 + Date.UTC(1900, 0, 6, 2, 5));
	    return offDate.getUTCDate(); // 返回月中的一天
	};

	/**
	 * 返回阴历 (y年,m+1月)
	 */
	Calendar.prototype.cyclical6 = function cyclical6(num, num2) {
	    if (num == 0) {
	        return _calendar_info2.default.jcName0[num2];
	    }
	    if (num == 1) {
	        return _calendar_info2.default.jcName1[num2];
	    }
	    if (num == 2) {
	        return _calendar_info2.default.jcName2[num2];
	    }
	    if (num == 3) {
	        return _calendar_info2.default.jcName3[num2];
	    }
	    if (num == 4) {
	        return _calendar_info2.default.jcName4[num2];
	    }
	    if (num == 5) {
	        return _calendar_info2.default.jcName5[num2];
	    }
	    if (num == 6) {
	        return _calendar_info2.default.jcName6[num2];
	    }
	    if (num == 7) {
	        return _calendar_info2.default.jcName7[num2];
	    }
	    if (num == 8) {
	        return _calendar_info2.default.jcName8[num2];
	    }
	    if (num == 9) {
	        return _calendar_info2.default.jcName9[num2];
	    }
	    if (num == 10) {
	        return _calendar_info2.default.jcName10[num2];
	    }
	    if (num == 11) {
	        return _calendar_info2.default.jcName11[num2];
	    }
	};

	//黄历禁忌
	Calendar.prototype.calConv2 = function calConv2(yy, mm, dd, y, d, m, dt, nm, nd) {
	    var dy = d + '' + dd;
	    if (yy == 0 && dd == 6 || yy == 6 && dd == 0 || yy == 1 && dd == 7 || yy == 7 && dd == 1 || yy == 2 && dd == 8 || yy == 8 && dd == 2 || yy == 3 && dd == 9 || yy == 9 && dd == 3 || yy == 4 && dd == 10 || yy == 10 && dd == 4 || yy == 5 && dd == 11 || yy == 11 && dd == 5) {
	        return { 'ban': ['日值岁破', '大事不宜'] };
	    } else if (mm == 0 && dd == 6 || mm == 6 && dd == 0 || mm == 1 && dd == 7 || mm == 7 && dd == 1 || mm == 2 && dd == 8 || mm == 8 && dd == 2 || mm == 3 && dd == 9 || mm == 9 && dd == 3 || mm == 4 && dd == 10 || mm == 10 && dd == 4 || mm == 5 && dd == 11 || mm == 11 && dd == 5) {
	        return { 'ban': ['日值月破', '大事不宜'] };
	    } else if (y == 0 && dy == '911' || y == 1 && dy == '55' || y == 2 && dy == '111' || y == 3 && dy == '75' || y == 4 && dy == '311' || y == 5 && dy == '95' || y == 6 && dy == '511' || y == 7 && dy == '15' || y == 8 && dy == '711' || y == 9 && dy == '35') {
	        return { 'ban': ['日值上朔', '大事不宜'] };
	    } else if (m == 1 && dt == 13 || m == 2 && dt == 11 || m == 3 && dt == 9 || m == 4 && dt == 7 || m == 5 && dt == 5 || m == 6 && dt == 3 || m == 7 && dt == 1 || m == 7 && dt == 29 || m == 8 && dt == 27 || m == 9 && dt == 25 || m == 10 && dt == 23 || m == 11 && dt == 21 || m == 12 && dt == 19) {
	        return { 'ban': ['日值杨公十三忌', '大事不宜'] };
	    } else {
	        return 0;
	    }
	};

	window.Calendar = Calendar;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by chenxingyu on 2017/1/19.
	 */

	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, /* DOMElement Element */element) {
	        return window.setTimeout(callback, 1000 / 60);
	    };
	}();

	window.cancelAnimFrame = function () {
	    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
	}();

	module.exports = {
	    // 返回对象的类型
	    type: function type(obj) {
	        var type;
	        if (obj == null) {
	            type = String(obj);
	        } else {
	            type = {}.toString.call(obj).toLowerCase();
	            type = type.substring(8, type.length - 1);
	        }
	        return type || "object";
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by chenxingyu on 2017/1/19.
	 */
	var dateInfo = {
	    // 农历1900-2100的润大小信息表
	    lunarInfo: [0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd255, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f, 0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6, 0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930, 0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef, 0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520],

	    // 公历每个月份的天数普通表
	    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	    //中文月份
	    chineseMonth: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	    // 天干
	    gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
	    // 地支
	    zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
	    // 生肖
	    animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
	    // 二十四节气
	    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
	    sTermInfo: [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],
	    nStr1: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
	    nStr2: ['初', '十', '廿', '卅', ' '],

	    jcName0: ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'],
	    jcName1: ['闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开'],
	    jcName2: ['开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收'],
	    jcName3: ['收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成'],
	    jcName4: ['成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危'],
	    jcName5: ['危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破'],
	    jcName6: ['破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执'],
	    jcName7: ['执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定'],
	    jcName8: ['定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平'],
	    jcName9: ['平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满'],
	    jcName10: ['满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除'],
	    jcName11: ['除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建'],

	    jcr: function jcr(d) {
	        var jcrjx;
	        if (d == '建') jcrjx = { 'suited': ['出行', '上任', '会友', '上书', '见工'], 'tapu': ['动土', '开仓', '嫁娶', '纳采'] };
	        if (d == '除') jcrjx = { 'suited': ['除服', '疗病', '出行', '拆卸', '入宅'], 'tapu': ['求官', '上任', '开张', '搬家', '探病'] };
	        if (d == '满') jcrjx = { 'suited': ['祈福', '祭祀', '结亲', '开市', '交易'], 'tapu': ['服药', '求医', '栽种', '动土', '迁移'] };
	        if (d == '平') jcrjx = { 'suited': ['祭祀', '修填', '涂泥', '余事勿取'], 'tapu': ['移徙', '入宅', '嫁娶', '开市', '安葬'] };
	        if (d == '定') jcrjx = { 'suited': ['易', '立券', '会友', '签约', '纳畜'], 'tapu': ['种植', '置业', '卖田', '掘井', '造船'] };
	        if (d == '执') jcrjx = { 'suited': ['祈福', '祭祀', '求子', '结婚', '立约'], 'tapu': ['开市', '交易', '搬家', '远行'] };
	        if (d == '破') jcrjx = { 'suited': ['求医', '赴考', '祭祀', '余事勿取'], 'tapu': ['动土', '出行', '移徙', '开市', '修造'] };
	        if (d == '危') jcrjx = { 'suited': ['经营', '交易', '求官', '纳畜', '动土'], 'tapu': ['登高', '行船', '安床', '入宅', '博彩'] };
	        if (d == '成') jcrjx = { 'suited': ['祈福', '入学', '开市', '求医', '成服'], 'tapu': ['词讼', '安门', '移徙'] };
	        if (d == '收') jcrjx = { 'suited': ['祭祀', '求财', '签约', '嫁娶', '订盟'], 'tapu': ['开市', '安床', '安葬', '入宅', '破土'] };
	        if (d == '开') jcrjx = { 'suited': ['疗病', '结婚', '交易', '入仓', '求职'], 'tapu': ['安葬', '动土', '针灸'] };
	        if (d == '闭') jcrjx = { 'suited': ['祭祀', '交易', '收财', '安葬'], 'tapu': ['宴会', '安床', '出行', '嫁娶', '移徙'] };
	        return jcrjx;
	    },

	    //国历节日  *表示放假日
	    sFtv: ["0101*元旦", "0106  中国13亿人口日", "0110  中国110宣传日", "0202  世界湿地日", "0204  世界抗癌症日", "0210  世界气象日", "0214  情人节", "0221  国际母语日", "0207  国际声援南非日", "0303  全国爱耳日", "0308  妇女节", "0312  植树节 孙中山逝世纪念日", "0315  消费者权益保护日", "0321  世界森林日", "0322  世界水日", "0323  世界气象日", "0324  世界防治结核病日", "0401  愚人节", "0407  世界卫生日", "0422  世界地球日", "0501*国际劳动节", "0504  中国青年节", "0505  全国碘缺乏病日", "0508  世界红十字日", "0512  国际护士节", "0515  国际家庭日", "0517  世界电信日", "0518  国际博物馆日", "0519  中国汶川地震哀悼日 全国助残日", "0520  全国学生营养日", "0522  国际生物多样性日", "0523  国际牛奶日", "0531  世界无烟日", "0601  国际儿童节", "0605  世界环境日", "0606  全国爱眼日", "0617  防治荒漠化和干旱日", "0623  国际奥林匹克日", "0625  全国土地日", "0626  国际反毒品日", "0701  建党节 香港回归纪念日", "0707  抗日战争纪念日", "0711  世界人口日", "0801  八一建军节", "0815  日本正式宣布无条件投降日", "0908  国际扫盲日", "0909  毛泽东逝世纪念日", "0910  教师节", "0916  国际臭氧层保护日", "0917  国际和平日", "0918  九·一八事变纪念日", "0920  国际爱牙日", "0927  世界旅游日", "0928  孔子诞辰", "1001*国庆节 国际音乐节 国际老人节", "1002  国际减轻自然灾害日", "1004  世界动物日", "1007  国际住房日", "1008  世界视觉日 全国高血压日", "1009  世界邮政日", "1010  辛亥革命纪念日 世界精神卫生日", "1015  国际盲人节", "1016  世界粮食节", "1017  世界消除贫困日", "1022  世界传统医药日", "1024  联合国日", "1025  人类天花绝迹日", "1026  足球诞生日", "1031  万圣节", "1107  十月社会主义革命纪念日", "1108  中国记者日", "1109  消防宣传日", "1110  世界青年节", "1112  孙中山诞辰", "1114  世界糖尿病日", "1117  国际大学生节", "1201  世界艾滋病日", "1203  世界残疾人日", "1209  世界足球日", "1210  世界人权日", "1212  西安事变纪念日", "1213  南京大屠杀", "1220  澳门回归纪念日", "1221  国际篮球日", "1224  平安夜", "1225  圣诞节 世界强化免疫日", "1226  毛泽东诞辰"],
	    //农历节日  *表示放假日
	    lFtv: ["0101*春节",
	    // "0102*大年初二",
	    // "0103*大年初三",
	    "0105  路神生日", "0115  元宵节", "0202  龙抬头", "0219  观世音圣诞", "0404  寒食节", "0408  佛诞节 ", "0505*端午节", "0606  天贶节 姑姑节", "0624  彝族火把节", "0707  七夕情人节", "0714  鬼节(南方)", "0715  盂兰节", "0730  地藏节", "0815*中秋节", "0909  重阳节", "1001  祭祖节", "1117  阿弥陀佛圣诞", "1208  腊八节 释迦如来成道日", "1223  小年", "0100*除夕"],
	    //某月的第几个星期几; 5,6,7,8 表示到数第 1,2,3,4 个星期几
	    wFtv: ["0110  黑人节", "0150  世界麻风日", "0121  日本成人节", "0520  母亲节", "0530  全国助残日", "0630  父亲节", "0716  合作节", "0730  被奴役国家周", "0932  国际和平日", "0940  国际聋人节 世界儿童日", "1011  国际住房日", "1144  感恩节"],
	    yFtv: []
	};

	module.exports = dateInfo;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Created by chenxingyu on 2016/12/22.
	 */
	/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
	(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return factory(global);
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        factory(global);
	    }
	})(undefined, function () {

	    // ? 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 中的"do" 。? 等价于 {0,1}。

	    // ! 非

	    // (pattern) 匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，
	    // 在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '\(' 或 '\)'。
	    // /(asdasd)/.exec('a') -> null   /(asdasd)/.exec('asdasd') -> ["asdasd","asdasd"]

	    // (?=pattern) 正向预查，在任何匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。
	    // 例如，'Windows (?=95|98|NT|2000)' 能匹配 "Windows 2000" 中的 "Windows" ，但不能匹配 "Windows 3.1" 中的 "Windows"。
	    // 预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
	    // /Windows(?=95|98|NT|2000)/.exec('Windows95') -> ["Windows"]  /Windows(?=95|98|NT|2000)/.exec('Windows') -> null

	    // (?!pattern)  负向预查，在任何不匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。
	    // 例如'Windows (?!95|98|NT|2000)' 能匹配 "Windows 3.1" 中的 "Windows"，但不能匹配 "Windows 2000" 中的 "Windows"。
	    // 预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。
	    // Windows(?!95|98|NT|2000)/.exec('Windows345') => ["Windows"]  /Windows(?!95|98|NT|2000)/.exec('Windows95') => null

	    //(?:pattern) 匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。
	    // 例如， 'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式。
	    // industr(?:y|ies)/.exec('industries') -> ["industries"]  /industr(?:y|ies)/.exec('industrsssss') -> null


	    var Zepto = function () {
	        var undefined;
	        var key;
	        var $;
	        var classList;
	        var emptyArray = [];
	        var _concat = emptyArray.concat;
	        var _filter = emptyArray.filter;
	        var _slice = emptyArray.slice;
	        var document = window.document;
	        var elementDisplay = {};
	        var classCache = {};
	        var cssNumber = {
	            'column-count': 1,
	            'columns': 1,
	            'font-weight': 1,
	            'line-height': 1,
	            'opacity': 1,
	            'z-index': 1,
	            'zoom': 1
	        };

	        //匹配开头以 空格(零次或多次) <(字符串) (\w+|!)(任意单词或者什么都没有) [^>]* (>字符串零次或多次) >(字符串)
	        var fragmentRE = /^\s*<(\w+|!)[^>]*>/; //匹配html标签

	        //匹配开头以 <(字符串)  (\w+)(任意单词）\s*(空格零次或多次)  /?(/字符串零次或一次) (?:<\/\1>|)(匹配</1> 或者 什么都没有)
	        var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

	        //
	        var tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;

	        //匹配body 或者 html
	        var rootNodeRE = /^(?:body|html)$/i;

	        //获取奇数次 ？ capitalRE.exec('A') -> ["A","A"]  capitalRE.exec('A') -> null  capitalRE.exec('A') -> ["A","A"] capitalRE.exec('A') -> null
	        var capitalRE = /([A-Z])/g;

	        // [A-Z]/g.exec('SDF') -> ["S"]   [A-Z]/g.exec('SDF') -> ["S"]   [A-Z]/g.exec('SDF') -> ["S"]


	        //应通过方法调用获取/设置的特殊属性
	        var methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'];

	        var adjacencyOperators = ['after', 'prepend', 'before', 'append'];

	        var table = document.createElement('table');
	        var tableRow = document.createElement('tr');
	        var containers = {
	            'tr': document.createElement('tbody'),
	            'tbody': table, 'thead': table, 'tfoot': table,
	            'td': tableRow, 'th': tableRow,
	            '*': document.createElement('div')
	        };
	        var readyRE = /complete|loaded|interactive/;
	        var simpleSelectorRE = /^[\w-]*$/; // w 匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'； - 连字符串 ；  * 等价于{0,} , 零次或多次；
	        var class2type = {};
	        var toString = class2type.toString;
	        var zepto = {};
	        var camelize;
	        var uniq;
	        var tempParent = document.createElement('div');
	        var propMap = {
	            'tabindex': 'tabIndex',
	            'readonly': 'readOnly',
	            'for': 'htmlFor',
	            'class': 'className',
	            'maxlength': 'maxLength',
	            'cellspacing': 'cellSpacing',
	            'cellpadding': 'cellPadding',
	            'rowspan': 'rowSpan',
	            'colspan': 'colSpan',
	            'usemap': 'useMap',
	            'frameborder': 'frameBorder',
	            'contenteditable': 'contentEditable'
	        };
	        var isArray = Array.isArray || function (object) {
	            return object instanceof Array;
	        };

	        zepto.matches = function (element, selector) {

	            if (!selector || !element || element.nodeType !== 1) {
	                return false;
	            }

	            //该Element.matches()方法,如果元素会由指定的选择器字符串来选择返回true; 否则，返回false。
	            var matchesSelector = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;

	            //如果存在
	            if (matchesSelector) {
	                return matchesSelector.call(element, selector);
	            } else {
	                var match,
	                    parent = element.parentNode,
	                    temp = !parent;
	                if (temp) {
	                    (parent = tempParent).appendChild(element);
	                }
	                match = ~zepto.qsa(parent, selector).indexOf(element);
	                temp && tempParent.removeChild(element);
	                return match;
	            }
	        };

	        //判断类型
	        function type(obj) {
	            return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	        }

	        //判断是否是函数
	        function isFunction(value) {
	            return type(value) == "function";
	        }

	        //判断是否是window
	        function isWindow(obj) {
	            return obj != null && obj == obj.window;
	        }

	        //判断是否是document
	        function isDocument(obj) {
	            return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	        }

	        //判断是否是object
	        function isObject(obj) {
	            return type(obj) == "object";
	        }

	        //判断是否是普通object
	        function isPlainObject(obj) {

	            return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	        }

	        //普通对象 ： {} ； 非普通对象 ： 如 new Function()

	        //判断是否是数组 , 排除类数组
	        function likeArray(obj) {
	            var length = !!obj && 'length' in obj && obj.length;
	            var type = $.type(obj);

	            return 'function' != type && !isWindow(obj) && ('array' == type || length === 0 || typeof length == 'number' && length > 0 && length - 1 in obj);
	        }

	        //数组中去掉 null
	        function compact(array) {
	            return _filter.call(array, function (item) {
	                return item != null;
	            });
	        }

	        function flatten(array) {
	            return array.length > 0 ? $.fn.concat.apply([], array) : array;
	        }

	        // - 转换 驼峰
	        camelize = function camelize(str) {
	            return str.replace(/-+(.)?/g, function (match, chr) {
	                return chr ? chr.toUpperCase() : '';
	            });
	        };

	        function dasherize(str) {

	            return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	        }

	        uniq = function uniq(array) {
	            return _filter.call(array, function (item, idx) {
	                return array.indexOf(item) == idx;
	            });
	        };

	        function classRE(name) {
	            if (name in classCache) {
	                return classCache[name];
	            } else {
	                return classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
	            }
	        }

	        function maybeAddPx(name, value) {
	            return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
	        }

	        //`$ .zepto.fragment`需要一个html字符串和一个可选的标签名
	        //从给定的html字符串生成DOM节点。
	        //生成的DOM节点作为数组返回。
	        //此函数可以在插件中覆盖，例如make
	        //它与不完全支持DOM的浏览器兼容。
	        zepto.fragment = function (html, name, properties) {
	            // 
	            var dom, nodes, container;

	            //单个标记的特殊情况优化s
	            if (singleTagRE.test(html)) {
	                dom = $(document.createElement(RegExp.$1));
	            }

	            if (!dom) {
	                if (html.replace) {
	                    html = html.replace(tagExpanderRE, "<$1></$2>");
	                }
	                if (name === undefined) {
	                    name = fragmentRE.test(html) && RegExp.$1;
	                }
	                if (!(name in containers)) {
	                    name = '*';
	                }

	                container = containers[name];
	                container.innerHTML = '' + html;

	                dom = $.each(_slice.call(container.childNodes), function () {

	                    container.removeChild(this);
	                });
	                // dom = $.each(slice.call(container.childNodes),function (){
	                //     container.removeChild(this)
	                // });
	            }

	            //如果是普通对象
	            if (isPlainObject(properties)) {
	                nodes = $(dom);
	                $.each(properties, function (key, value) {
	                    if (methodAttributes.indexOf(key) > -1) {
	                        nodes[key](value);
	                    } else {
	                        nodes.attr(key, value);
	                    }
	                });
	            }

	            return dom;
	        };

	        function defaultDisplay(nodeName) {

	            var element;
	            var display;
	            if (!elementDisplay[nodeName]) {
	                element = document.createElement(nodeName);
	                document.body.appendChild(element);
	                display = getComputedStyle(element, '').getPropertyValue("display");
	                element.parentNode.removeChild(element);
	                display == "none" && (display = "block");
	                elementDisplay[nodeName] = display;
	            }
	            return elementDisplay[nodeName];
	        }

	        function _children(element) {

	            return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
	                if (node.nodeType == 1) {
	                    return node;
	                }
	            });
	        }

	        function Z(dom, selector) {
	            // 
	            var i,
	                len = dom ? dom.length : 0;
	            for (i = 0; i < len; i++) {
	                this[i] = dom[i];
	            }
	            this.length = len;
	            this.selector = selector || '';
	        }

	        // `$ .zepto.init`是Zepto的对应的jQuery的`$ .fn.init`和
	        // 接受一个CSS选择器和一个可选的上下文（并处理各种特殊情况）。
	        // 此方法可以在插件中覆盖。
	        zepto.init = function (selector, context) {
	            // 
	            var dom;
	            //如果没有给出，返回一个空的Zepto集合
	            if (!selector) {
	                return zepto.Z();
	            } else if (typeof selector == 'string') {
	                selector = selector.trim();
	                //如果它是一个html片段，从它创建节点
	                //注意：在Chrome 21和Firefox 15中，DOM错误12
	                //如果片段不以<开头，则抛出
	                if (selector[0] == '<' && fragmentRE.test(selector)) {
	                    dom = zepto.fragment(selector, RegExp.$1, context);
	                    selector = null;
	                    //如果有上下文，首先在该上下文上创建一个集合，然后从那里选择节点
	                } else if (context !== undefined) {
	                    $(context).find(selector);

	                    //如果它是一个CSS选择器，使用它来选择节点。
	                } else {
	                    dom = zepto.qsa(document, selector);
	                }

	                //如果给定一个函数，当DOM准备就绪时调用它
	            } else if (isFunction(selector)) {
	                // 
	                return $(document).ready(selector);
	                //如果给出了Zepto集合，只需返回它
	            } else if (zepto.isZ(selector)) {
	                return selector;
	            } else {
	                //如果给出了节点数组，则归一化数组
	                if (isArray(selector)) {
	                    dom = compact(selector);
	                    //包裹dom节点
	                } else if (isObject(selector)) {
	                    dom = [selector];
	                    selector = null;
	                    //如果它是一个html片段，从它创建节点
	                } else if (fragmentRE.test(selector)) {
	                    dom = zepto.fragment(selector.trim(), RegExp.$1, context);
	                    selector = null;
	                    //如果有上下文，首先在该上下文上创建一个集合，然后从那里选择节点
	                } else if (context !== undefined) {
	                    return $(context).find(selector);
	                    //最后但并非最不重要的，如果它是一个CSS选择器，使用它来选择节点。
	                } else {
	                    dom = zepto.qsa(document, selector);
	                }
	            }

	            //从找到的节点创建一个新的Zepto集合
	            return zepto.Z(dom, selector);
	        };

	        // `$ .zepto.Z'用`$ .fn'换出给定的`dom`数组的原型，
	        // 从而为数组提供所有的Zepto函数。
	        // 此方法可以在插件中覆盖。
	        zepto.Z = function (dom, selector) {
	            return new Z(dom, selector);
	        };

	        // `$ .zepto.isZ`应该返回`true`如果给定的对象是Zepto集合。
	        // 此方法可以在插件中覆盖。
	        zepto.isZ = function (object) {
	            return object instanceof zepto.Z;
	        };

	        // `$`将是基本的Zepto对象。 当调用这个
	        // 函数只是调用`$ .zepto.init，
	        // 这使得实现选择节点和创建在插件中可修补的Zepto集合的细节。
	        $ = function $(selector, context) {
	            return zepto.init(selector, context);
	        };

	        //实现多层对象拷贝
	        function extend(target, source, deep) {
	            for (key in source) {
	                // 
	                //如果满足条件 ， 则执行深复制
	                if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	                    if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                        target[key] = {};
	                    }

	                    if (isArray(source[key]) && !isArray(target[key])) {
	                        target[key] = [];
	                    }

	                    extend(target[key], source[key], deep);
	                } else if (source[key] !== undefined) {
	                    target[key] = source[key];
	                }
	            }
	        }

	        //将所有未定义的属性从一个或多个对象复制到`target`对象。
	        $.extend = function (target) {
	            // 
	            var deep;
	            var args = _slice.call(arguments, 1);
	            if (typeof target == 'boolean') {
	                deep = target;
	                target = args.shift();
	            }

	            args.forEach(function (arg) {
	                // 
	                extend(target, arg, deep);
	            });

	            return target;
	        };

	        // `$ .zepto.qsa`是Zepto的CSS选择器实现
	        // 使用`document.querySelectorAll`并对某些特殊情况（例如`＃id`）进行优化。
	        // 此方法可以在插件中覆盖。
	        zepto.qsa = function (element, selector) {
	            var found;
	            var result;
	            var maybeID = selector[0] == '#';
	            var maybeClass = !maybeID && selector[0] == '.';
	            var nameOnly = maybeID || maybeClass ? selector.slice(1) : selector; //确保仍然选中1个字符的标签名称
	            var isSimple = simpleSelectorRE.test(nameOnly);

	            //先判断是否是id
	            if (element.getElementById && isSimple && maybeID) {
	                found = element.getElementById(nameOnly);
	                if (found) {
	                    result = [found];
	                } else {
	                    result = [];
	                }
	            } else {
	                if (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) {
	                    result = [];
	                } else {
	                    var elementList;
	                    if (isSimple && !maybeID && element.getElementsByClassName) {
	                        //如果它很简单，它可能是一个类
	                        if (maybeClass) {
	                            elementList = element.getElementsByClassName(nameOnly);
	                            //或标签名
	                        } else {
	                            elementList = element.getElementsByTagName(selector);
	                        }
	                        //或者它不简单，我们需要查询所有
	                    } else {
	                        elementList = element.querySelectorAll(selector);
	                    }
	                    result = _slice.call(elementList);
	                }
	            }

	            return result;

	            // 三元运算符的做法 代码及其难以理解
	            // return (element.getElementById && isSimple && maybeID) ?   // Safari DocumentFragment没有getElementById
	            //     ((found = element.getElementById(nameOnly)) ? [found] : [] ) :
	            //     (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
	            //         slice.call(
	            //             isSimple && !maybeID && element.getElementsByClassName ?
	            //                 maybeClass ? element.getElementsByClassName(nameOnly) :    //如果它很简单，它可能是一个类
	            //                     element.getElementsByTagName(selector) : //或标签名
	            //                 element.querySelectorAll(selector)   //或者它不简单，我们需要查询所有
	            //         );
	        };

	        function filtered(nodes, selector) {
	            return selector == null ? $(nodes) : $(nodes).filter(selector);
	        }

	        //包含
	        $.contains = document.documentElement.contains ? function contains(parent, node) {
	            // 
	            return parent !== node && parent.contains(node);
	        } : function contains(parent, node) {
	            while (node && (node = node.parentNode)) {
	                if (node === parent) {
	                    return true;
	                }
	            }
	            return false;
	        };

	        function funcArg(context, arg, idx, payload) {

	            return isFunction(arg) ? arg.call(context, idx, payload) : arg;
	        }

	        //设置属性
	        function setAttribute(node, name, value) {
	            // 
	            value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
	        }

	        //访问className属性，同时遵守SVGAnimatedString
	        function className(node, value) {

	            var klass = node.className || '';
	            var svg = klass && klass.baseVal !== undefined;

	            if (value === undefined) {
	                if (svg) {
	                    return klass.baseVal;
	                } else {
	                    return klass;
	                }
	            }

	            if (svg) {
	                klass.baseVal = value;
	            } else {
	                node.className = value;
	            }
	        }

	        // "true"  => true
	        // "false" => false
	        // "null"  => null
	        // "42"    => 42
	        // "42.5"  => 42.5
	        // "08"    => "08"
	        // JSON    => parse if valid
	        // String  => self
	        function deserializeValue(value) {
	            try {
	                var result;
	                if (value) {
	                    if (value == "false") {
	                        result = false;
	                    } else if (value == "null") {
	                        result = null;
	                    } else if (+value + "" == value) {
	                        result = +value;
	                    } else if (/^[\[\{]/.test(value)) {
	                        result = $.parseJSON(value);
	                    } else {
	                        result = value;
	                    }

	                    return value == "true" || result;
	                } else {
	                    return value;
	                }
	            } catch (e) {
	                return value;
	            }
	        }

	        $.type = type;
	        $.isFunction = isFunction;
	        $.isWindow = isWindow;
	        $.isArray = isArray;
	        $.isPlainObject = isPlainObject;

	        //判断是否是空对象
	        $.isEmptyObject = function (obj) {
	            var name;
	            for (name in obj) {
	                return false;
	            }
	            return true;
	        };

	        //判断是否是数字
	        $.isNumeric = function (value) {
	            var num = Number(value);
	            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	            return num != null && type != 'boolean' && (type != 'string' || value.length) && !isNaN(num) && isFinite(num) || false;
	        };

	        //在数组里面
	        $.inArray = function (elem, array, i) {
	            return emptyArray.indexOf.apply(array, elem, i);
	        };

	        //空函数
	        $.noop = function () {};

	        //map 遍历
	        $.map = function (elements, callback) {

	            var value,
	                values = [],
	                i,
	                len,
	                key;
	            if (likeArray(elements)) {
	                for (i = 0, len = elements.length; i < len; i++) {
	                    value = callback(elements[i], i);
	                    if (value != null) {
	                        values.push(value);
	                    }
	                }
	            } else {
	                for (key in elements) {
	                    value = callback(elements[key], key);
	                    if (value != null) {
	                        values.push(value);
	                    }
	                }
	            }

	            return flatten(values);
	        };

	        //each遍历
	        $.each = function (elements, callback) {

	            var i, len, key;
	            if (likeArray(elements)) {
	                for (i = 0, len = elements.length; i < len; i++) {
	                    if (callback.call(elements[i], i, elements[i]) === false) {
	                        return elements;
	                    }
	                }
	            } else {
	                for (key in elements) {

	                    if (callback.call(elements[key], key, elements[key]) === false) {
	                        return elements;
	                    }
	                }
	            }
	            return elements;
	        };

	        //获取一个只包含回调函数返回true的项目的新数组。
	        $.grep = function (elements, callback) {
	            return _filter.call(elements, callback);
	        };

	        if (window.JSON) $.parseJSON = JSON.parse;

	        //把类型放进数组
	        $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	            class2type["[object " + name + "]"] = name.toLowerCase();
	        });

	        // 定义将在所有可用的方法
	        // Zepto集合
	        $.fn = {
	            constructor: zepto.Z,
	            length: 0,

	            //因为一个集合的行为就像一个数组
	            //复制这些有用的数组函数。
	            forEach: emptyArray.forEach,
	            reduce: emptyArray.reduce,
	            push: emptyArray.push,
	            sort: emptyArray.sort,
	            splice: emptyArray.splice,
	            indexOf: emptyArray.indexOf,
	            concat: function concat() {
	                var i,
	                    value,
	                    args = [];
	                for (i = 0; i < arguments.length; i++) {
	                    value = arguments[i];
	                    args[i] = zepto.isZ(value) ? value.toArray() : value;
	                }
	                return _concat.apply(zepto.isZ(this) ? this.toArray() : this, args);
	            },

	            //`map`和`slice`在jQuery API工作不同于它们的数组对应
	            map: function map(fn) {

	                return $($.map(this, function (el, i) {
	                    return fn.call(el, i, el);
	                }));
	            },
	            slice: function slice(fn) {

	                return $(_slice.apply(this, arguments));
	            },

	            ready: function ready(callback) {
	                // 
	                //需要检查document.body是否存在IE浏览器报告
	                //文档准备好，当它还没有创建body元素
	                if (readyRE.test(document.readyState) && document.body) {
	                    callback($);
	                } else {
	                    document.addEventListener('DOMContentLoaded', function () {
	                        callback($);
	                    }, false);
	                }
	                return this;
	            },
	            get: function get(idx) {

	                return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
	            },
	            toArray: function toArray() {
	                return this.get();
	            },
	            size: function size() {
	                return this.length;
	            },
	            remove: function remove() {
	                // 
	                return this.each(function remove() {
	                    if (this.parentNode != null) {
	                        this.parentNode.removeChild(this);
	                    }
	                });
	            },
	            each: function each(callback) {

	                emptyArray.every.call(this, function (el, idx) {

	                    return callback.call(el, idx, el) !== false;
	                });
	                return this;
	            },
	            filter: function filter(selector) {

	                if (isFunction(selector)) {
	                    return this.not(this.not(selector));
	                } else {
	                    return $(_filter.call(this, function (element) {

	                        return zepto.matches(element, selector);
	                    }));
	                }
	            },
	            add: function add(selector, context) {
	                return $(uniq(this.concat($(selector, context))));
	            },
	            is: function is(selector) {
	                return this.length > 0 && zepto.matches(this[0], selector);
	            },
	            not: function not(selector) {

	                var nodes = [];
	                if (isFunction(selector) && selector.call != undefined) {
	                    this.each(function (idx) {
	                        if (!selector.call(this, idx)) {
	                            nodes.push(this);
	                        }
	                    });
	                } else {
	                    var excludes;
	                    if (typeof selector == 'string') {
	                        excludes = this.filter(selector);
	                    } else {
	                        if (likeArray(selector) && isFunction(selector.item)) {
	                            excludes = _slice.call(selector);
	                        } else {
	                            excludes = $(selector);
	                        }
	                    }
	                    this.forEach(function (el) {
	                        if (excludes.indexOf(el) < 0) {
	                            nodes.push(el);
	                        }
	                    });
	                }
	                return $(nodes);
	            },
	            has: function has(selector) {
	                return this.filter(function () {
	                    if (isObject(selector)) {
	                        return $.contains(this, selector);
	                    } else {
	                        return $(this).find(selector).size();
	                    }
	                });
	            },
	            eq: function eq(idx) {
	                return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
	            },
	            first: function first() {
	                var el = this[0];
	                return el && !isObject(el) ? el : $(el);
	            },
	            last: function last() {
	                var el = this[this.length - 1];
	                return el && !isObject(el) ? el : $(el);
	            },
	            find: function find(selector) {

	                var result;
	                var $this = this;
	                if (!selector) {
	                    result = $();
	                } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') {
	                    result = $(selector).filter(function () {
	                        var node = this;
	                        return emptyArray.some.call($this, function (parent) {
	                            return $.contains(parent, node);
	                        });
	                    });
	                } else if (this.length === 1) {
	                    result = $(zepto.qsa(this[0], selector));
	                } else {
	                    result = this.map(function (index, item) {
	                        // console.log(item, 'item');
	                        // console.log(this, 'this');
	                        return zepto.qsa(this, selector);
	                    });
	                }

	                return result;
	            },
	            closest: function closest(selector, context) {

	                var nodes = [];
	                var collection = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object' && $(selector);
	                this.each(function (_, node) {

	                    while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
	                        node = node !== context && !isDocument(node) && node.parentNode;
	                    }
	                    if (node && nodes.indexOf(node) < 0) {
	                        nodes.push(node);
	                    }
	                });
	                return $(nodes);
	            },
	            parents: function parents(selector) {

	                var ancestors = [];
	                var nodes = this;
	                while (nodes.length > 0) {
	                    nodes = $.map(nodes, function (node) {

	                        if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	                            ancestors.push(node);
	                            return node;
	                        }
	                    });
	                }
	                return filtered(ancestors, selector);
	            },
	            parent: function parent(selector) {

	                return filtered(uniq(this.pluck('parentNode')), selector);
	            },
	            children: function children(selector) {

	                return filtered(this.map(function () {

	                    return _children(this);
	                }), selector);
	            },
	            contents: function contents() {

	                return this.map(function () {

	                    return this.contentDocument || _slice.call(this.childNodes);
	                });
	            },
	            siblings: function siblings(selector) {

	                return filtered(this.map(function (i, el) {

	                    return _filter.call(_children(el.parentNode), function (child) {

	                        return child !== el;
	                    });
	                }), selector);
	            },
	            empty: function empty() {
	                return this.each(function () {
	                    this.innerHTML = '';
	                });
	            },
	            show: function show() {

	                this.each(function () {

	                    this.style.display == "none" && (this.style.display = '');
	                    if (getComputedStyle(this, '').getPropertyValue("display") == "none") {
	                        this.style.display = defaultDisplay(this.nodeName);
	                    }
	                });
	            },
	            pluck: function pluck(property) {
	                //采取
	                return $.map(this, function (el) {
	                    return el[property];
	                });
	            },
	            replaceWith: function replaceWith(newContent) {

	                return this.before(newContent).remove();
	            },
	            wrap: function wrap(structure) {

	                var node;
	                var func = isFunction(structure);
	                if (this[0] && !func) {
	                    var dom = $(structure).get(0);
	                    var clone = dom.parentNode || this.length > 1;
	                }
	                return this.each(function (index) {

	                    if (func) {
	                        node = structure.call(this, index);
	                    } else {
	                        if (clone) {
	                            node = dom.cloneNode(true);
	                        } else {
	                            node = dom;
	                        }
	                    }
	                    $(this).wrapAll(node);
	                });
	            },
	            wrapAll: function wrapAll(structure) {
	                if (this[0]) {
	                    structure = $(structure);
	                    $(this[0]).before(structure);
	                    debugger;
	                    var children;
	                    //向下钻取到大多数元素
	                    while ((children = structure.children()).length) {

	                        structure = children.first();
	                    }
	                    $(structure).append(this);
	                }
	            },
	            wrapInner: function wrapInner(structure) {
	                var func = isFunction(structure);
	                return this.each(function (index) {
	                    var self = $(this);
	                    var contents = self.contents();
	                    var dom;

	                    if (func) {
	                        dom = structure.call(this, index);
	                    } else {
	                        dom = structure;
	                    }

	                    if (contents.length) {
	                        contents.wrapAll(dom);
	                    } else {
	                        self.append(dom);
	                    }
	                });
	            },
	            unwrap: function unwrap() {

	                this.parent().each(function () {

	                    $(this).replaceWith($(this).children());
	                });
	                return this;
	            },
	            clone: function clone() {
	                return this.map(function () {
	                    return this.cloneNode(true);
	                });
	            },
	            hide: function hide() {
	                return this.css("display", "none");
	            },
	            toggle: function toggle(setting) {
	                return this.each(function () {
	                    var el = $(this);
	                    if (setting === undefined) {
	                        setting = el.css("display") == "none";
	                    }

	                    if (setting) {
	                        el.show();
	                    } else {
	                        el.hide();
	                    }
	                });
	            },
	            prev: function prev(selector) {
	                return $(this.pluck('previousElementSibling')).filter(selector || '*');
	            },
	            next: function next(selector) {
	                return $(this.pluck('nextElementSibling')).filter(selector || '*');
	            },
	            html: function html(_html) {
	                if (0 in arguments) {
	                    return this.each(function (idx) {
	                        var originHtml = this.innerHTML;
	                        $(this).empty().append(funcArg(this, _html, idx, originHtml));
	                    });
	                } else {
	                    if (0 in this) {
	                        return this[0].innerHTML;
	                    } else {
	                        return null;
	                    }
	                }
	            },
	            text: function text(_text) {
	                if (0 in arguments) {
	                    return this.each(function (idx) {
	                        var newText = funcArg(this, _text, idx, this.textContent);
	                        this.textContent = newText == null ? '' : '' + newText;
	                    });
	                } else {
	                    if (0 in this) {
	                        return this.pluck('textContent').join("");
	                    } else {
	                        return null;
	                    }
	                }
	            },
	            //设置属性
	            attr: function attr(name, value) {
	                var result;
	                //判断 name 是否是字符串 && value存在
	                if (typeof name == 'string' && !(1 in arguments)) {
	                    var attrBute = this[0].getAttribute(name);
	                    if (0 in this && this[0].nodeType == 1 && attrBute != null) {
	                        result = attrBute;
	                    }
	                } else {
	                    result = this.each(function attr(idx) {
	                        if (this.nodeType !== 1) {
	                            return;
	                        }

	                        //如果是对象
	                        if (isObject(name)) {
	                            for (var key in name) {
	                                setAttribute(this, key, name[key]);
	                            }
	                        } else {
	                            setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
	                        }
	                    });
	                }

	                return result;
	            },
	            removeAttr: function removeAttr(name) {
	                return this.each(function () {

	                    this.nodeType === 1 && name.split(' ').forEach(function (attribute) {

	                        setAttribute(this, attribute);
	                    }, this);
	                });
	            },
	            prop: function prop(name, value) {

	                name = propMap[name] || name;
	                if (1 in arguments) {
	                    return this.each(function (idx) {

	                        this[name] = funcArg(this, value, idx, this[name]);
	                    });
	                } else {
	                    return this[0] && this[0][name];
	                }
	            },
	            removeProp: function removeProp(name) {
	                name = propMap[name] || name;
	                return this.each(function () {
	                    delete this[name];
	                });
	            },
	            data: function data(name, value) {
	                var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();
	                var data;

	                if (1 in arguments) {
	                    data = this.attr(attrName, value);
	                } else {
	                    data = this.attr(attrName);
	                }

	                if (data !== null) {
	                    return deserializeValue(data);
	                } else {
	                    return undefined;
	                }
	            },
	            val: function val(value) {
	                if (0 in arguments) {
	                    if (value == null) {
	                        value = "";
	                    }
	                    return this.each(function (idx) {
	                        this.value = funcArg(this, value, idx, this.value);
	                    });
	                } else {
	                    if (this[0] && this[0].multiple) {
	                        return $(this[0]).find('option').filter(function () {
	                            return this.selected;
	                        }).pluck('value');
	                    } else {
	                        return this[0].value;
	                    }
	                }
	            },
	            offset: function offset(coordinates) {
	                if (coordinates) {
	                    return this.each(function (index) {
	                        var $this = $(this);
	                        var coords = funcArg(this, coordinates, index, $this.offset());
	                        var parentOffset = $this.offsetParent().offset();
	                        var props = {
	                            top: coords.top - parentOffset.top,
	                            left: coords.left - parentOffset.left
	                        };

	                        if ($this.css('position') == 'static') {
	                            props['position'] = 'relative';
	                        }

	                        $this.css(props);
	                    });
	                }

	                if (!this.length) {
	                    return null;
	                }

	                if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0])) {
	                    return { top: 0, left: 0 };
	                }

	                var obj = this[0].getBoundingClientRect();
	                return {
	                    left: obj.left + window.pageXOffset,
	                    top: obj.top + window.pageYOffset,
	                    width: Math.round(obj.width),
	                    height: Math.round(obj.height)
	                };
	            },
	            css: function css(property, value) {
	                //如果是一个参数
	                if (arguments.length < 2) {
	                    var element = this[0];
	                    if (typeof property == 'string') {
	                        if (!element) {
	                            return;
	                        }
	                        return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property);
	                        //对于数组
	                    } else if (isArray(property)) {
	                        if (!element) {
	                            return;
	                        }
	                        var props = {};
	                        var computedStyle = getComputedStyle(element, '');
	                        $.each(property, function (_, prop) {
	                            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
	                        });
	                        return props;
	                    }
	                }

	                var css = '';

	                if (type(property) == 'string') {
	                    if (!value && value !== 0) {
	                        this.each(function () {
	                            this.style.removeProperty(dasherize(property));
	                        });
	                    } else {
	                        css = css + dasherize(property) + ":" + maybeAddPx(property, value);
	                    }
	                    //对于对象
	                } else {
	                    for (key in property) {
	                        if (!property[key] && property[key] !== 0) {
	                            this.each(function () {
	                                this.style.removeProperty(dasherize(key));
	                            });
	                        } else {
	                            css = css + dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
	                        }
	                    }
	                }

	                return this.each(function () {
	                    this.style.cssText += ';' + css;
	                });
	            },
	            index: function index(element) {
	                if (element) {
	                    return this.indexOf($(element)[0]);
	                } else {
	                    return this.parent().children().indexOf(this[0]);
	                }
	            },
	            hasClass: function hasClass(name) {

	                if (!name) {
	                    return this;
	                } else {
	                    return emptyArray.some.call(this, function (el) {
	                        return this.test(className(el));
	                    }, classRE(name));
	                }
	            },
	            addClass: function addClass(name) {
	                if (!name) {
	                    return this;
	                } else {
	                    this.each(function (idx) {
	                        if (!('className' in this)) {
	                            return;
	                        }
	                        classList = [];
	                        var cls = className(this);
	                        var newName = funcArg(this, name, idx, cls);
	                        newName.split(/\s+/g).forEach(function (klass) {
	                            if (!$(this).hasClass(klass)) {
	                                classList.push(klass);
	                            }
	                        }, this);
	                        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
	                    });
	                }
	            },
	            removeClass: function removeClass(name) {
	                return this.each(function (idx) {

	                    if (!('className' in this)) {
	                        return;
	                    }

	                    if (name === undefined) {
	                        return className(this, '');
	                    }

	                    classList = className(this);

	                    funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {

	                        classList = classList.replace(classRE(klass), " ");
	                    });

	                    className(this, classList.trim());
	                });
	            },
	            toggleClass: function toggleClass(name, when) {
	                if (!name) {
	                    return this;
	                } else {
	                    return this.each(function (idx) {

	                        var $this = $(this);
	                        var names = funcArg(this, name, idx, className(this));
	                        names.split(/\s+/g).forEach(function (klass) {

	                            if (when === undefined) {
	                                when = !$this.hasClass(klass);
	                            }

	                            if (when) {
	                                $this.addClass(klass);
	                            } else {
	                                $this.removeClass(klass);
	                            }
	                        });
	                    });
	                }
	            },
	            scrollTop: function scrollTop(value) {
	                if (this.length) {
	                    var hasScrollTop = 'scrollTop' in this[0];
	                    var scrollTopFun;
	                    if (value === undefined) {
	                        if (hasScrollTop) {
	                            return this[0].scrollTop;
	                        } else {
	                            return this[0].pageYOffset;
	                        }
	                    }

	                    if (hasScrollTop) {
	                        scrollTopFun = function scrollTopFun() {
	                            this.scrollTop = value;
	                        };
	                    } else {
	                        scrollTopFun = function scrollTopFun() {
	                            this.scrollTo(this.scrollX, value);
	                        };
	                    }

	                    return this.each(scrollTopFun);
	                }
	            },
	            scrollLeft: function scrollLeft(value) {
	                if (this.length) {
	                    var hasScrollLeft = 'scrollLeft' in this[0];
	                    var scrollLeftFun;
	                    if (value === undefined) {
	                        if (hasScrollLeft) {
	                            return this[0].scrollLeft;
	                        } else {
	                            return this[0].pageXOffset;
	                        }
	                    }

	                    if (hasScrollLeft) {
	                        scrollLeftFun = function scrollLeftFun() {
	                            this.scrollLeft = value;
	                        };
	                    } else {
	                        scrollLeftFun = function scrollLeftFun() {
	                            this.scrollTo(value, this.scrollY);
	                        };
	                    }

	                    return this.each(scrollLeftFun);
	                }
	            },
	            position: function position() {
	                if (this.length) {
	                    var elem = this[0];
	                    //获取实际父偏移值
	                    var offsetParent = this.offsetParent();
	                    //获得正确的偏移量
	                    var offset = this.offset();
	                    var parentOffset;

	                    if (rootNodeRE.test(offsetParent[0].nodeName)) {
	                        parentOffset = { top: 0, left: 0 };
	                    } else {
	                        parentOffset = offsetParent.offset();
	                    }

	                    // 减去元素边距
	                    // 注意：当元素有margin：auto时offsetLeft和marginLeft
	                    // 在Safari中是相同的，导致offset.left不正确地为0
	                    offset.top = offset.top - parseFloat($(elem).css('margin-top')) || 0;
	                    offset.left = offset.left - parseFloat($(elem).css('margin-left')) || 0;

	                    //添加offsetParent边框
	                    parentOffset.top = parentOffset.top + parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
	                    parentOffset.left = parentOffset.left + parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

	                    //减去两个偏移
	                    return {
	                        top: offset.top - parentOffset.top,
	                        left: offset.left - parentOffset.left
	                    };
	                }
	            },
	            offsetParent: function offsetParent() {
	                return this.map(function () {
	                    var parent = this.offsetParent || document.body;
	                    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
	                        parent = parent.offsetParent;
	                    }
	                    return parent;
	                });
	            }
	        };

	        // for now
	        $.fn.detach = $.fn.remove;

	        //生成`width`和`height`函数
	        ['width', 'height'].forEach(function (dimension) {
	            var dimensionProperty = dimension.replace(/./, function (m) {
	                return m[0].toUpperCase();
	            });

	            $.fn[dimension] = function (value) {
	                var offset;
	                var el = this[0];

	                //获取宽度
	                if (value === undefined) {
	                    if (isWindow(el)) {
	                        return el['inner' + dimensionProperty];
	                    } else if (isDocument(el)) {
	                        return el.documentElement['scroll' + dimensionProperty];
	                    } else {
	                        offset = this.offset();
	                        return offset && offset[dimension];
	                    }

	                    //设置宽度
	                } else {
	                    return this.each(function (idx) {
	                        el = $(this);
	                        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
	                    });
	                }
	            };
	        });

	        //遍历节点
	        function traverseNode(node, fun) {
	            fun(node);
	            for (var i = 0, len = node.childNodes.length; i < len; i++) {
	                traverseNode(node.childNodes[i], fun);
	            }
	        }

	        //生成`after`，`prepend`，`before`，`append`，
	        //`insertAfter`，`insertBefore`，`appendTo`和`prependTo`方法。
	        adjacencyOperators.forEach(function (operator, operatorIndex) {
	            var inside = operatorIndex % 2; //=> prepend, append
	            $.fn[operator] = function () {

	                //参数可以是节点，节点数组，Zepto对象和HTML字符串
	                var argType;
	                var parent;
	                var copyByClone = this.length > 1;
	                var nodes = $.map(arguments, function (arg) {

	                    var arr = [];
	                    argType = type(arg);
	                    //数组
	                    if (argType == "array") {
	                        arg.forEach(function (el) {

	                            if (el.nodeType !== undefined) {
	                                return arr.push(el);
	                            } else if ($.zepto.isZ(el)) {
	                                return arr = arr.concat(el.get());
	                            }
	                            arr = arr.concat(zepto.fragment(el));
	                        });
	                        return arr;
	                    }

	                    if (argType == "object" || arg == null) {
	                        return arg;
	                    } else {
	                        return zepto.fragment(arg);
	                    }
	                });

	                if (nodes.length < 1) {
	                    return this;
	                }

	                return this.each(function (_, target) {

	                    parent = inside ? target : target.parentNode;

	                    //将所有方法转换为“before”操作
	                    if (operatorIndex != 2) {
	                        if (operatorIndex == 0) {
	                            target = target.nextSibling;
	                        } else if (operatorIndex == 1) {
	                            target = target.firstChild;
	                        } else {
	                            target = null;
	                        }
	                    }

	                    var parentInDocument = $.contains(document.documentElement, parent);

	                    nodes.forEach(function (node) {

	                        if (copyByClone) {
	                            node = node.cloneNode(true);
	                        } else if (!parent) {
	                            return $(node).remove();
	                        }

	                        parent.insertBefore(node, target);

	                        if (parentInDocument) {
	                            traverseNode(node, function (el) {
	                                if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) {
	                                    var target = el.ownerDocument ? el.ownerDocument.defaultView : window;
	                                    target['eval'].call(target, el.innerHTML);
	                                }
	                            });
	                        }
	                    });
	                });
	            };
	        });

	        // zepto.Z 原型 和 Z函数原型 指向 $.fn
	        zepto.Z.prototype = Z.prototype = $.fn;

	        // 导出`$ .zepto`命名空间中的内部API函数
	        zepto.uniq = uniq;
	        zepto.deserializeValue = deserializeValue;
	        $.zepto = zepto;

	        return $;
	    }();

	    window.Zepto = Zepto;
	    window.$ === undefined && (window.$ = Zepto);

	    //事件处理
	    (function ($) {
	        var _zid = 1;
	        var undefined;
	        var slice = Array.prototype.slice;
	        var isFunction = $.isFunction;
	        var isString = function isString(obj) {
	            return typeof obj == 'string';
	        };
	        var handlers = {};
	        var specialEvents = {};
	        var focusinSupported = 'onfocusin' in window;
	        var focus = { focus: 'focusin', blur: 'focusout' };
	        var hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

	        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

	        function zid(element) {
	            return element._zid || (element._zid = _zid = _zid + 1);
	        }

	        //查找处理程序
	        function findHandlers(element, event, fn, selector) {
	            // 
	            event = parse(event);
	            if (event.ns) {
	                var matcher = matcherFor(event.ns);
	            }

	            return (handlers[zid(element)] || []).filter(function (handler) {
	                // 
	                return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	            });
	        }

	        function parse(event) {

	            var parts = ('' + event).split('.');
	            return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
	        }

	        function matcherFor(ns) {

	            return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
	        }

	        function eventCapture(handler, captureSetting) {

	            return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
	        }

	        function realEvent(type) {

	            return hover[type] || focusinSupported && focus[type] || type;
	        }

	        function returnTrue() {
	            return true;
	        }

	        function returnFalse() {
	            return false;
	        }

	        var ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/;
	        var eventMethods = {
	            preventDefault: 'isDefaultPrevented',
	            stopImmediatePropagation: 'isImmediatePropagationStopped',
	            stopPropagation: 'isPropagationStopped'
	        };

	        //添加事件
	        function add(element, events, fn, data, selector, delegator, capture) {
	            // 
	            var id = zid(element);
	            var set = handlers[id] || (handlers[id] = []);
	            events.split(/\s/).forEach(function (event) {
	                // 
	                if (event == 'ready') {
	                    return $(document).ready(fn);
	                }
	                var handler = parse(event);
	                handler.fn = fn;
	                handler.sel = selector;
	                //模拟mouseenter，mouseleave
	                if (handler.e in hover) {
	                    fn = function fn(e) {
	                        var related = e.relatedTarget;
	                        if (!related || related !== this && !$.contains(this, related)) {
	                            return handler.fn.apply(this, arguments);
	                        }
	                    };
	                }
	                handler.del = delegator;
	                var callback = delegator || fn;
	                handler.proxy = function (e) {

	                    e = compatible(e);
	                    if (e.isImmediatePropagationStopped()) {
	                        return;
	                    }
	                    e.data = data;
	                    var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
	                    if (result === false) {
	                        e.preventDefault();
	                        e.stopPropagation();
	                    }
	                    return result;
	                };
	                handler.i = set.length;
	                set.push(handler);
	                if ('addEventListener' in element) {
	                    element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	                }
	            });
	        }

	        //移除事件
	        function remove(element, events, fn, selector, capture) {
	            // 
	            var id = zid(element);
	            (events || '').split(/\s/).forEach(function (event) {
	                // 
	                var currentHandlers = findHandlers(element, event, fn, selector);
	                currentHandlers.forEach(function (handler) {
	                    // 
	                    delete handlers[id][handler.i];
	                    if ('removeEventListener' in element) {
	                        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	                    }
	                });
	            });
	        }

	        $.event = { add: add, remove: remove };

	        $.proxy = function (fn, context) {
	            var args = 2 in arguments && slice.call(arguments, 2);

	            //判断fn
	            if (isFunction(fn)) {
	                var proxyFn = function proxyFn() {
	                    return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
	                };
	                proxyFn._zid = zid(fn);
	                return proxyFn;
	            } else if (isString(context)) {
	                if (args) {
	                    args.unshift(fn[context], fn);
	                    return $.proxy.apply(null, args);
	                } else {
	                    return $.proxy(fn[context], fn);
	                }
	            } else {
	                throw new TypeError("expected function");
	            }
	        };

	        //兼容 eventMethods 对象
	        function compatible(event, source) {

	            if (source || !event.isDefaultPrevented) {
	                source || (source = event);

	                $.each(eventMethods, function (name, predicate) {

	                    var sourceMethod = source[name];

	                    event[name] = function () {
	                        this[predicate] = returnTrue;
	                        return sourceMethod && sourceMethod.apply(source, arguments);
	                    };

	                    event[predicate] = returnFalse;
	                });

	                event.timeStamp || (event.timeStamp = Date.now());

	                var defaults;
	                if (source.defaultPrevented !== undefined) {
	                    defaults = source.defaultPrevented;
	                } else if ('returnValue' in source) {
	                    defaults = source.returnValue === false;
	                } else {
	                    defaults = source.getPreventDefault && source.getPreventDefault();
	                }

	                if (defaults) {
	                    event.isDefaultPrevented = returnTrue;
	                }
	            }
	            return event;
	        }

	        //创建代理
	        function createProxy(event) {
	            // 
	            var key;
	            var proxy = { originalEvent: event };

	            //拷贝 event 对象
	            for (key in event) {
	                // 
	                if (!ignoreProperties.test(key) && event[key] !== undefined) {
	                    proxy[key] = event[key];
	                }
	            }
	            return compatible(proxy, event);
	        }

	        $.fn.bind = function (event, data, callback) {
	            return this.on(event, data, callback);
	        };

	        $.fn.unbind = function (event, callback) {
	            return this.off(event, callback);
	        };

	        $.fn.one = function (event, selector, data, callback) {
	            return this.on(event, selector, data, callback, 1);
	        };

	        $.fn.delegate = function (selector, event, callback) {
	            return this.on(event, selector, callback);
	        };

	        $.fn.undelegate = function (selector, event, callback) {
	            return this.off(event, selector, callback);
	        };

	        $.fn.live = function (event, callback) {
	            $(document.body).delegate(this.selector, event, callback);
	            return this;
	        };

	        $.fn.die = function (event, callback) {
	            $(document.body).undelegate(this.selector, event, callback);
	            return this;
	        };

	        //绑定事件
	        $.fn.on = function (event, selector, data, callback, one) {

	            var autoRemove;
	            var delegator;
	            var $this = this;

	            //如果存在 event 并且不是字符串
	            if (event && !isString(event)) {
	                $.each(event, function (type, fn) {
	                    $this.on(type, selector, data, fn, one);
	                });
	                return $this;
	            }

	            //非字符串 && 非函数
	            if (!isString(selector) && !isFunction(callback) && callback !== false) {
	                callback = data;
	                data = selector;
	                selector = undefined;
	            }

	            if (callback === undefined || data === false) {
	                callback = data;
	                data = undefined;
	            }

	            if (callback === false) {
	                callback = returnFalse;
	            }

	            return $this.each(function (_, element) {
	                // 
	                if (one) {
	                    autoRemove = function autoRemove(e) {
	                        remove(element, e.type, callback);
	                        return callback.apply(this, arguments);
	                    };
	                }

	                if (selector) {
	                    //事件代理函数
	                    delegator = function delegator(e) {
	                        // 
	                        var evt;
	                        var match = $(e.target).closest(selector, element).get(0);
	                        if (match && match !== element) {
	                            evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
	                            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
	                        }
	                    };
	                }

	                //添加事件
	                add(element, event, callback, data, selector, delegator || autoRemove);
	            });
	        };

	        //解除事件
	        $.fn.off = function (event, selector, callback) {
	            var $this = this;
	            //如果存在 event 并且不是字符串
	            if (event && !isString(event)) {
	                $.each(event, function (type, fn) {
	                    $this.off(type, selector, fn);
	                });
	                return $this;
	            }

	            //非字符串 && 非函数
	            if (!isString(selector) && !isFunction(callback) && callback !== false) {
	                callback = selector;
	                selector = undefined;
	            }

	            if (callback === false) {
	                callback = returnFalse;
	            }

	            //遍历解除
	            return $this.each(function () {
	                remove(this, event, callback, selector);
	            });
	        };

	        //触发事件
	        $.fn.trigger = function (event, args) {

	            if (isString(event) || $.isPlainObject(event)) {
	                event = $.Event(event);
	            } else {
	                event = compatible(event);
	            }

	            event._args = args;

	            return this.each(function () {

	                // handle focus（），blur（）直接调用它们
	                if (event.type in focus && typeof this[event.type] == "function") {
	                    this[event.type]();
	                    //集合中的项目可能不是DOM元素
	                } else if ('dispatchEvent' in this) {
	                    this.dispatchEvent(event); //触发事件
	                } else {
	                    $(this).triggerHandler(event, args); //触发事件
	                }
	            });
	        };

	        //触发当前元素上的事件处理程序，就像发生事件一样，
	        //不触发实际事件，不会冒泡
	        $.fn.triggerHandler = function (event, args) {
	            var e;
	            var result;
	            var currentHandlers;
	            this.each(function (i, element) {
	                if (isString(event)) {
	                    event = $.Event(event);
	                }
	                e = createProxy(event);
	                e._args = args;
	                e.target = element;
	                currentHandlers = findHandlers(element, event.type || event);
	                $.each(currentHandlers, function (i, handler) {
	                    result = handler.proxy(e);
	                    if (e.isImmediatePropagationStopped()) {
	                        return false;
	                    }
	                });
	            });

	            return result;
	        };

	        //用于每个事件类型的`.bind（event，fn）`的快捷方法
	        var eventType = 'focusin focusout focus blur load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error';
	        eventType.split(' ').forEach(function (event) {
	            $.fn[event] = function (callback) {
	                if (0 in arguments) {
	                    return this.bind(event, callback);
	                } else {
	                    return this.trigger(event);
	                }
	            };
	        });

	        $.Event = function (type, props) {

	            if (!isString(type)) {
	                props = type;
	                type = props.type;
	            }
	            var event = document.createEvent(specialEvents[type] || 'Events');
	            var bubbles = true;
	            if (props) {
	                for (var name in props) {

	                    if (name == 'bubbles') {
	                        bubbles = !!props[name];
	                    } else {
	                        event[name] = props[name];
	                    }
	                }
	            }
	            event.initEvent(type, bubbles, true);
	            return compatible(event);
	        };
	    })(Zepto);

	    //网络层
	    (function ($) {
	        var jsonpID = +new Date();
	        var document = window.document;
	        var key;
	        var name;
	        var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	        var scriptTypeRE = /^(?:text|application)\/javascript/i;
	        var xmlTypeRE = /^(?:text|application)\/xml/i;
	        var jsonType = 'application/json';
	        var htmlType = 'text/html';
	        var blankRE = /^\s*$/;
	        var originAnchor = document.createElement('a');

	        originAnchor.href = window.location.href;

	        //触发自定义事件，如果已取消，则返回false
	        function triggerAndReturn(context, eventName, data) {

	            var event = $.Event(eventName);
	            $(context).trigger(event, data);
	            return !event.isDefaultPrevented();
	        }

	        //触发Ajax“全局”事件
	        function triggerGlobal(settings, context, eventName, data) {

	            if (settings.global) {
	                return triggerAndReturn(context || document, eventName, data);
	            }
	        }

	        //活动Ajax请求数
	        $.active = 0;

	        //请求开始
	        function ajaxStart(settings) {
	            if (settings.global && ($.active = $.active + 1) === 0) {
	                triggerGlobal(settings, null, 'ajaxStart');
	            }
	        }

	        //请求停止
	        function ajaxStop(settings) {
	            if (settings.global && !($.active = $.active - 1)) {
	                triggerGlobal(settings, null, 'ajaxStop');
	            }
	        }

	        //触发一个额外的全局事件“ajaxBeforeSend”，就像“ajaxSend”，但可取消
	        function ajaxBeforeSend(xhr, settings) {

	            var context = settings.context;
	            var _beforeSend = settings.beforeSend.call(context, xhr, settings);
	            var _triggerGlobal = triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]);
	            if (_beforeSend === false || _triggerGlobal === false) {
	                return false;
	            }
	            triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
	        }

	        //请求成功
	        function ajaxSuccess(data, xhr, settings, deferred) {
	            var context = settings.context;
	            var status = 'success';
	            settings.success.call(context, data, status, xhr);
	            if (deferred) {
	                deferred.resolveWith(context, [data, status, xhr]);
	            }
	            triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
	            ajaxComplete(status, xhr, settings);
	        }

	        // 请求失败 type: "timeout", "error", "abort", "parsererror"
	        function ajaxError(error, type, xhr, settings, deferred) {
	            var context = settings.context;
	            settings.error.call(context, xhr, type, error);

	            if (deferred) {
	                deferred.rejectWith(context, [xhr, type, error]);
	            }

	            triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
	            ajaxComplete(type, xhr, settings);
	        }

	        //请求完成 status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	        function ajaxComplete(status, xhr, settings) {
	            var context = settings.context;
	            settings.complete.call(context, xhr, status);
	            triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
	            ajaxStop(settings);
	        }

	        //数据过滤器回调
	        function ajaxDataFilter(data, type, settings) {
	            if (settings.dataFilter == empty) {
	                return data;
	            }
	            var context = settings.context;
	            return settings.dataFilter.call(context, data, type);
	        }

	        //空函数，用作默认回调
	        function empty() {}

	        $.ajaxJSONP = function (options, deferred) {
	            if (!('type' in options)) {
	                return $.ajax(options);
	            }

	            var _callbackName = options.jsonpCallback;
	            var callbackName;
	            var script = document.createElement('script');
	            var originalCallback = window[callbackName];
	            var responseData;
	            var abort = function abort(errorType) {
	                $(script).triggerHandler('error', errorType || 'abort');
	            };
	            var xhr = { abort: abort };
	            var abortTimeout;

	            if ($.isFunction(_callbackName)) {
	                callbackName = _callbackName();
	            } else {
	                callbackName = _callbackName || 'Zepto' + jsonpID++;
	            }

	            if (deferred) {
	                deferred.promise(xhr);
	            }

	            //定义 script 加载成功 加载失败 事件
	            $(script).on('load error', function (e, errorType) {

	                clearTimeout(abortTimeout);
	                $(script).off().remove();

	                if (e.type == 'error' || !responseData) {
	                    ajaxError(null, errorType || 'error', xhr, options, deferred);
	                } else {
	                    ajaxSuccess(responseData[0], xhr, options, deferred);
	                }

	                window[callbackName] = originalCallback;

	                if (responseData && $.isFunction(originalCallback)) {
	                    originalCallback(responseData[0]);
	                }

	                originalCallback = responseData = undefined;
	            });

	            var _ajaxBeforeSend = ajaxBeforeSend(xhr, options);
	            if (_ajaxBeforeSend === false) {
	                abort('abort');
	                return xhr;
	            }

	            window[callbackName] = function () {

	                responseData = arguments;
	            };

	            //测试
	            window[callbackName]({
	                "name": "chen",
	                "age": 20,
	                "clothes": {
	                    "coat": "coat",
	                    "underClothing": "Under clothing",
	                    "Shoes": "Shoes"
	                }
	            });

	            script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
	            document.head.appendChild(script);

	            if (options.timeout > 0) {
	                abortTimeout = setTimeout(function () {
	                    abort('timeout');
	                }, options.timeout);
	            }

	            return xhr;
	        };

	        $.ajaxSettings = {
	            // 默认请求类型
	            type: 'GET',
	            // 在请求之前执行的回调
	            beforeSend: empty,
	            // 如果请求成功，则执行回调
	            success: empty,
	            // 如果请求失败，则执行回调
	            error: empty,
	            // 如果请求完成，则执行回调(两者：错误和成功)
	            complete: empty,
	            // 回调的上下文
	            context: null,
	            // 是否触发“全局”Ajax事件
	            global: false,
	            // 运输
	            xhr: function xhr() {
	                return new window.XMLHttpRequest();
	            },
	            // MIME类型映射
	            // IIS将“Javascript”作为“application / x-javascript”
	            accepts: {
	                script: 'text/javascript, application/javascript, application/x-javascript',
	                json: jsonType,
	                xml: 'application/xml, text/xml',
	                html: htmlType,
	                text: 'text/plain'
	            },
	            //请求是否是另一个域
	            crossDomain: false,
	            // 默认超时
	            timeout: 0,
	            // 数据是否应该序列化为字符串
	            processData: true,
	            // 是否允许浏览器缓存GET响应
	            cache: true,
	            //用于处理XMLHttpRequest的原始响应数据。
	            //这是一个预过滤功能来清理响应。
	            //应返回已清理的响应
	            dataFilter: empty
	        };

	        //获取mime数据类型
	        function mimeToDataType(mime) {
	            var result;
	            if (mime) {
	                mime = mime.split(';', 2)[0];
	            }

	            if (mime == htmlType) {
	                result = 'html';
	            } else if (mime == jsonType) {
	                result = 'json';
	            } else if (scriptTypeRE.test(mime)) {
	                result = 'script';
	            } else if (xmlTypeRE.test(mime)) {
	                result = 'xml';
	            } else {
	                result = 'text';
	            }

	            return mime && result;
	        }

	        //追加参数
	        function appendQuery(url, query) {
	            if (query == '') {
	                return url;
	            }
	            return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	        }

	        // serialize payload 并将其附加到GET请求的URL
	        function serializeData(options) {
	            if (options.processData && options.data && $.type(options.data) != "string") {
	                options.data = $.param(options.data, options.traditional);
	            }
	            if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType)) {
	                options.url = appendQuery(options.url, options.data);
	                options.data = undefined;
	            }
	        }

	        $.ajax = function (options) {
	            var settings = $.extend({}, options || {});
	            var deferred = $.Deferred && $.Deferred();
	            var urlAnchor;
	            var hashIndex;

	            for (key in $.ajaxSettings) {
	                if (settings[key] === undefined) {
	                    settings[key] = $.ajaxSettings[key];
	                }
	            }

	            ajaxStart(settings);

	            //请求是否是另一个域
	            if (!settings.crossDomain) {
	                urlAnchor = document.createElement('a');
	                urlAnchor.href = settings.url;
	                //清理.href的网址（仅限IE） 看 https://github.com/madrobby/zepto/pull/1049
	                urlAnchor.href = urlAnchor.href;
	                settings.crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
	            }

	            if (!settings.url) {
	                settings.url = window.location.toString();
	            }

	            hashIndex = settings.url.indexOf('#');
	            if (hashIndex > -1) {
	                settings.url = settings.url.slice(0, hashIndex);
	            }

	            //序列化数据
	            serializeData(settings);

	            var dataType = settings.dataType;
	            var hasPlaceholder = /\?.+=\?/.test(settings.url);

	            if (hasPlaceholder) {
	                dataType = 'jsonp';
	            }

	            if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) {

	                settings.url = appendQuery(settings.url, '_=' + Date.now());
	            }

	            //判断是否是jsonp
	            if ('jsonp' == dataType) {
	                if (!hasPlaceholder) {
	                    var jsonpQuery;
	                    if (settings.jsonp) {
	                        jsonpQuery = settings.jsonp + '=?';
	                    } else if (settings.jsonp === false) {
	                        jsonpQuery = '';
	                    } else {
	                        jsonpQuery = 'callback=?';
	                    }
	                    settings.url = appendQuery(settings.url, jsonpQuery);
	                }
	                return $.ajaxJSONP(settings, deferred);
	            }

	            var mime = settings.accepts[dataType];
	            var headers = {};
	            var setHeader = function setHeader(name, value) {
	                headers[name.toLowerCase()] = [name, value];
	            };
	            var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
	            var xhr = settings.xhr();
	            var nativeSetHeader = xhr.setRequestHeader;
	            var abortTimeout;

	            if (deferred) {
	                deferred.promise(xhr);
	            }

	            //设置请求头信息
	            if (!settings.crossDomain) {
	                setHeader('X-Requested-With', 'XMLHttpRequest');
	            }

	            setHeader('Accept', mime || '*/*');

	            if (mime = settings.mimeType || mime) {
	                if (mime.indexOf(',') > -1) {
	                    mime = mime.split(',', 2)[0];
	                }
	                //覆盖由服务器返回的MIME类型。
	                xhr.overrideMimeType && xhr.overrideMimeType(mime);
	            }

	            if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') {
	                setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
	            }

	            if (settings.headers) {
	                for (name in settings.headers) {
	                    setHeader(name, settings.headers[name]);
	                }
	            }

	            xhr.setRequestHeader = setHeader;

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    xhr.onreadystatechange = empty;
	                    clearTimeout(abortTimeout);
	                    var result;
	                    var error = false;

	                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {

	                        dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));

	                        //判断文件类型
	                        if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob') {
	                            result = xhr.response;
	                        } else {
	                            result = xhr.responseText;

	                            try {
	                                // http://perfectionkills.com/global-eval-what-are-the-options/
	                                // 如果提供了数据过滤器回调，则相应地进行响应
	                                result = ajaxDataFilter(result, dataType, settings);

	                                if (dataType == 'script') {
	                                    (1, eval)(result);
	                                } else if (dataType == 'xml') {
	                                    result = xhr.responseXML;
	                                } else if (dataType == 'json') {
	                                    if (blankRE.test(result)) {
	                                        result = null;
	                                    } else {
	                                        result = $.parseJSON(result);
	                                    }
	                                }
	                            } catch (e) {
	                                error = e;
	                            }

	                            //处理错误
	                            if (error) {
	                                return ajaxError(error, 'parsererror', xhr, settings, deferred);
	                            }
	                        }

	                        ajaxSuccess(result, xhr, settings, deferred);
	                    } else {
	                        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
	                    }
	                }
	            };

	            var _ajaxBeforeSend = ajaxBeforeSend(xhr, settings);
	            if (_ajaxBeforeSend === false) {
	                //中止请求
	                xhr.abort();
	                ajaxError(null, 'abort', xhr, settings, deferred);
	                return xhr;
	            }

	            var async = 'async' in settings ? settings.async : true;

	            //初始化请求
	            xhr.open(settings.type, settings.url, async, settings.username, settings.password);

	            if (settings.xhrFields) {
	                for (name in settings.xhrFields) {
	                    xhr[name] = settings.xhrFields[name];
	                }
	            }

	            // 该XMLHttpRequest.setRequestHeader（）方法设置一个HTTP请求头的值。你必须调用setRequestHeader()后  open()，但在此之前send()。
	            // 如果此方法用相同的标题叫了几次，值合并成一个单一的请求头。
	            for (name in headers) {
	                nativeSetHeader.apply(xhr, headers[name]);
	            }

	            if (settings.timeout > 0) {
	                abortTimeout = setTimeout(function () {
	                    xhr.onreadystatechange = empty;
	                    xhr.abort();
	                    ajaxError(null, 'timeout', xhr, settings, deferred);
	                }, settings.timeout);
	            }

	            // 该XMLHttpRequest.send()方法发送请求。如果请求是异步的（这是默认值），这个方法只要发送请求返回。
	            // 如果请求是同步的，这个方法不返回，直到响应到达。
	            // send()接受请求主体的可选参数。如果请求方法是GET或HEAD，参数被忽略，请求主体设置为null。

	            // 避免发送空字符串（＃319）
	            xhr.send(settings.data ? settings.data : null);

	            return xhr;
	        };

	        //处理可选数据/成功参数
	        function parseArguments(url, data, success, dataType) {
	            if ($.isFunction(data)) {
	                dataType = success;
	                success = data;
	                data = undefined;
	            }

	            if (!$.isFunction(success)) {
	                dataType = success;
	                success = undefined;
	            }

	            return {
	                url: url,
	                data: data,
	                success: success,
	                dataType: dataType
	            };
	        }

	        $.get = function () /* url, data, success, dataType */{
	            return $.ajax(parseArguments.apply(null, arguments));
	        };

	        $.post = function () /* url, data, success, dataType */{
	            var options = parseArguments.apply(null, arguments);
	            options.type = 'POST';
	            return $.ajax(options);
	        };

	        //获得通过Ajax GET请求JSON数据
	        $.getJSON = function () /* url, data, success, dataType */{
	            var options = parseArguments.apply(null, arguments);
	            options.dataType = 'json';
	            return $.ajax(options);
	        };

	        // 设置当前收集的HTML内容到一个GET Ajax调用指定URL的结果。
	        // 或者，一个CSS选择器可以在URL中指定，像这样，仅使用HTML内容选择更新集合匹配：
	        $.fn.load = function (url, data, success) {
	            if (!this.length) {
	                return this;
	            }

	            var self = this;
	            var parts = url.split(/\s/);
	            var selector;
	            var options = parseArguments(url, data, success);
	            var callback = options.success;

	            if (parts.length > 1) {
	                options.url = parts[0];
	                selector = parts[1];
	            }

	            options.success = function (response) {
	                self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
	                callback && callback.apply(self, arguments);
	            };

	            $.ajax(options);
	            return this;
	        };

	        var escape = encodeURIComponent;

	        function serialize(params, obj, traditional, scope) {
	            var type;
	            var array = $.isArray(obj);
	            var hash = $.isPlainObject(obj);

	            $.each(obj, function (key, value) {
	                // 
	                type = $.type(value);

	                if (scope) {
	                    if (traditional) {
	                        key = scope;
	                    } else {
	                        key = scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
	                    }
	                }

	                //以serializeArray（）格式处理数据
	                if (!scope && array) {
	                    params.add(value.name, value.value);
	                    //递归到嵌套对象中
	                } else if (type == "array" || !traditional && type == "object") {
	                    serialize(params, value, traditional, key);
	                } else {
	                    params.add(key, value);
	                }
	            });
	        }

	        $.param = function (obj, traditional) {
	            // 
	            var params = [];
	            params.add = function (key, value) {
	                if ($.isFunction(value)) {
	                    value = value();
	                }
	                if (value == null) {
	                    value = "";
	                }
	                this.push(escape(key) + '=' + escape(value));
	            };

	            serialize(params, obj, traditional);
	            return params.join('&').replace(/%20/g, '+');
	        };
	    })(Zepto);

	    (function ($) {
	        $.fn.serializeArray = function () {
	            var name;
	            var type;
	            var result = [];
	            var add = function add(value) {
	                if (value.forEach) {
	                    return value.forEach(add);
	                }
	                result.push({ name: name, value: value });
	            };

	            if (this[0]) {
	                $.each(this[0].elements, function (_, field) {
	                    type = field.type;
	                    name = field.name;

	                    if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && (type != 'radio' && type != 'checkbox' || field.checked)) {

	                        add($(field).val());
	                    }
	                });
	            }
	            return result;
	        };

	        $.fn.serialize = function () {
	            var result = [];
	            this.serializeArray().forEach(function (elm) {
	                result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
	            });

	            return result.join('&');
	        };

	        $.fn.submit = function (callback) {
	            if (0 in arguments) {
	                this.bind('submit', callback);
	            } else if (this.length) {
	                var event = $.Event('submit');
	                this.eq(0).trigger(event);
	                if (!event.isDefaultPrevented()) {
	                    this.get(0).submit();
	                }
	            }
	        };
	    })(Zepto);

	    (function () {
	        // getComputedStyle不应该在调用时出错
	        // 没有有效的元素作为参数
	        try {
	            getComputedStyle(undefined);
	        } catch (e) {
	            var nativeGetComputedStyle = getComputedStyle;
	            window.getComputedStyle = function (element, pseudoElement) {
	                try {
	                    return nativeGetComputedStyle(element, pseudoElement);
	                } catch (e) {
	                    return null;
	                }
	            };
	        }
	    })();

	    return Zepto;
	});

/***/ }
/******/ ]);