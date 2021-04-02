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

	"use strict";

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_util2.default); /**
	                              * Created by chenxingyu on 2016/12/29.
	                              */


	var emptyArray = [];
	var concat = emptyArray.concat;
	var filter = emptyArray.filter;
	var slice = emptyArray.slice;
	var ARGS_RE = /\S+/g;

	function mixin(obj, Constructor) {
	    var instance = new Constructor(),
	        mixto = obj && obj.prototype || obj || {};
	    _util2.default.extend(mixto, instance);
	    return obj;
	}

	/**
	* 处理程序
	* 从jQuery的回调修改
	*
	* @param {String | Object}选项
	* @例
	* var handlers1 = new Handlers（'once memory') ;
	* var handlers2 = new Handlers（{once：true，memory：true}）;
	**/

	var Handlers = function Handlers() {
	    var optionsCache = {};
	    var STATUS = {
	        INIT: 0,
	        FIRING: 1,
	        FIRED: 2
	    };

	    function createOptions(options) {
	        var object = optionsCache[options] = {};
	        _util2.default.each(options.match(ARGS_RE), function (flag) {
	            object[flag] = true;
	        });
	        return object;
	    }

	    function Constructor(options) {
	        // options.once：确保处理程序只能触发一次
	        // options.memory：在状态更改为最新“记忆”值后添加的调用处理程序
	        this.options = typeof options === "string" ? optionsCache[options] || createOptions(options) : _util2.default.extend({}, options);
	        // 处理程序列表
	        this.list = [];
	        // 重复列表的堆栈火
	        this.stack = !this.options.once && [];
	        //记住的值
	        this.dataCache = null;
	        //当前状态
	        this.status = STATUS.INIT;
	        this.firingStart = this.firingLength = this.firingIndex = 0;
	    }

	    Constructor.prototype = {
	        //触发回调函数
	        _fire: function _fire(args) {
	            var list = this.list;
	            var stack = this.stack;
	            this.firingIndex = this.firingStart || 0;
	            this.firingStart = 0;
	            this.firingLength = list.length;
	            //缓存数据
	            this.dataCache = this.options.memory && args;
	            this.status = STATUS.FIRING;

	            debugger;
	            //指定回调函数触发
	            var fn;
	            _util2.default.each(args[1], function (args1, index) {
	                if (_util2.default.isFunction(args1) && !_util2.default.isFunction(fn)) {
	                    fn = args1;
	                    this.splice(index, 1);
	                }
	            });

	            //触发回调函数
	            for (; list && this.firingIndex < this.firingLength; this.firingIndex++) {
	                //如果指定回调函数触发
	                var index = _util2.default.indexOf(this.list, fn);
	                if (fn !== undefined && index > -1) {
	                    list[index].apply(args[0], args[1]);
	                    break;
	                    //否则触发该事件所有回调函数
	                } else {
	                    list[this.firingIndex].apply(args[0], args[1]);
	                }
	            }

	            this.status = STATUS.FIRED;
	            if (list) {
	                if (stack) {
	                    if (stack.length) {
	                        this._fire(stack.shift());
	                    }
	                } else if (this.dataCache) {
	                    this.empty();
	                } else {
	                    this.disable();
	                }
	            }
	        },

	        //添加回调函数
	        add: function add() {
	            var that = this;
	            // debugger;
	            if (this.list) {
	                // debugger;
	                //缓存列表的当前长度
	                var start = this.list.length;
	                (function add(args) {
	                    _util2.default.each(args, function (arg) {
	                        var type = _util2.default.type(arg);
	                        if (type === "function") {
	                            that.list.push(arg);
	                        } else if (arg && arg.length && type !== "string") {
	                            add(arg);
	                        }
	                    });
	                })(arguments);

	                if (this.status === STATUS.FIRING) {
	                    this.firingLength = this.list.length;
	                } else if (this.dataCache) {
	                    this.firingStart = start;
	                    this._fire(this.dataCache);
	                }
	            }
	        },
	        //删除回调函数 ，arguments是函数数组
	        remove: function remove() {
	            if (this.list) {
	                _util2.default.each(arguments, function (arg) {
	                    var index = _util2.default.indexOf(this.list, arg);
	                    while (index > -1) {
	                        this.list.splice(index, 1);
	                        if (this.status === STATUS.FIRING) {
	                            if (index <= this.firingLength) {
	                                this.firingLength = this.firingLength - 1;
	                            }
	                            if (index <= this.firingIndex) {
	                                this.firingIndex = this.firingIndex - 1;
	                            }
	                        }

	                        index = _util2.default.indexOf(this.list, arg, index);
	                    }
	                }, this);
	            }
	            return this;
	        },
	        //删除所有回调函数 ， 不需要接收 arguments
	        removeAll: function removeAll() {
	            if (this.list) {
	                // this.firingIndex = 0;
	                return this.empty();
	            }
	            return this;
	        },
	        has: function has(handler) {
	            var list = this.list;
	            return handler ? _util2.default.indexOf(list, handler) > -1 : !!(list && list.length);
	        },
	        empty: function empty() {
	            this.list.length = 0;
	            this.firingLength = 0;
	            return this;
	        },
	        disable: function disable() {
	            this.list = this.stack = this.dataCache = null;
	            return this;
	        },
	        lock: function lock() {
	            this.stack = null;
	            if (!this.dataCache) {
	                this.disable();
	            }
	            return this;
	        },
	        fireWith: function fireWith(context, args) {
	            var notFired = this.status !== STATUS.FIRED;
	            var firing = this.status === STATUS.FIRING;
	            var list = this.list;
	            var stack = this.stack;
	            args = args || [];
	            args = [context, args];
	            // args = [ context, args.slice ? args.slice() : args ];

	            if (list && (notFired || stack)) {
	                if (firing) {
	                    stack.push(args);
	                } else {
	                    this._fire(args);
	                }
	            }

	            return this;
	        }
	    };

	    return Constructor;
	}();

	// Observer Pattern
	function Event(obj) {
	    this.handlers = {};
	    if (obj != null) {
	        return mixin(obj, Event);
	    }
	}

	//绑定事件
	Event.prototype.on = function (events) {
	    var args = slice.call(arguments, 1);
	    var iterator = function iterator(event, args) {
	        var handlers = this.handlers[event];
	        if (!handlers) {
	            handlers = this.handlers[event] = new Handlers();
	        }
	        handlers.add.apply(handlers, args);
	    };

	    //字符串
	    if (typeof events === "string") {
	        _util2.default.each(events.match(ARGS_RE), function (event) {
	            iterator.call(this, event, args);
	        }, this);
	    } else {
	        _util2.default.each(events, function (handler, event) {
	            iterator.call(this, event, [handler]);
	        }, this);
	    }
	    return this;
	};

	//移除单个事件 ， arguments指定回调函数
	Event.prototype.off = function (events) {
	    var args = slice.call(arguments, 1);
	    var iterator = function iterator(event, args) {
	        var handlers = this.handlers[event];
	        if (handlers) {
	            handlers.remove.apply(handlers, args);
	        }
	    };

	    //字符串
	    if (typeof events === "string") {
	        _util2.default.each(events.match(ARGS_RE), function (event) {
	            iterator.call(this, event, args);
	        }, this);
	    } else {
	        _util2.default.each(events, function (handler, event) {
	            iterator.call(this, event, [handler]);
	        }, this);
	    }

	    return this;
	};

	//移除所有事件
	Event.prototype.offAll = function (events) {
	    var args = slice.call(arguments, 1);
	    var iterator = function iterator(event, args) {
	        var handlers = this.handlers[event];
	        if (handlers) {
	            handlers.removeAll.apply(handlers, args);
	        }
	    };

	    //字符串
	    if (typeof events === "string") {
	        _util2.default.each(events.match(ARGS_RE), function (event) {
	            iterator.call(this, event, args);
	        }, this);
	    } else {
	        _util2.default.each(events, function (handler, event) {
	            iterator.call(this, event, [handler]);
	        }, this);
	    }

	    return this;
	};

	//触发事件 ， 所有回调都会被调用
	Event.prototype.trigger = function (events) {
	    debugger;
	    var args = slice.call(arguments, 1);
	    _util2.default.each(events.match(ARGS_RE), function (event) {
	        debugger;
	        var handlers = this.handlers[event];
	        if (handlers) {
	            handlers.fireWith(handlers, args);
	        }
	    }, this);

	    return this;
	};

	Event.mixin = mixin;
	Event.Handlers = Handlers;

	window.Event = Event;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by chenxingyu on 2016/12/29.
	 */

	var util = {};
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var emptyArray = [];
	var concat = emptyArray.concat;
	var filter = emptyArray.filter;
	var slice = emptyArray.slice;

	//判断是否是数组 , 排除类数组
	function likeArray(obj) {
	    var length = !!obj && 'length' in obj && obj.length;
	    var type = util.type(obj);

	    return 'function' != type && !isWindow(obj) && ('array' == type || length === 0 || typeof length == 'number' && length > 0 && length - 1 in obj);
	}

	//判断是否是window
	function isWindow(obj) {
	    return obj != null && obj == obj.window;
	}

	// 返回对象的类型
	util.type = function (obj) {
	    var type;
	    if (obj == null) {
	        type = String(obj);
	    } else {
	        type = toString.call(obj).toLowerCase();
	        type = type.substring(8, type.length - 1);
	    }
	    return type || "object";
	};

	//判断是否是函数
	util.isFunction = function (value) {
	    return util.type(value) == "function";
	};

	// 遍历数组或对象，当迭代函数返回 false 时终止
	util.each = function (obj, callback, context) {
	    var i;
	    var len;
	    var key;
	    context = context || obj || null;

	    if (likeArray(obj)) {
	        for (i = 0, len = obj.length; i < len; i++) {
	            if (callback.call(context, obj[i], i, obj) === false) {
	                return;
	            }
	        }
	    } else {
	        for (key in obj) {
	            if (hasOwn.call(obj, key)) {
	                if (callback.call(context, obj[key], key, obj) === false) {
	                    return;
	                }
	            }
	        }
	    }
	};

	// 将方法的 this 绑定为指定的对象
	util.bind = function (fn, context) {
	    var args = slice.call(arguments, 2);
	    return function bind() {
	        fn.apply(context || null, args.concat(slice.call(arguments)));
	    };
	};

	// 来自 jQuery
	util.isPlainObject = function (obj) {
	    var key;
	    if (!obj || util.type(obj) !== "object" || obj.nodeType || "setInterval" in obj) {
	        return false;
	    }
	    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	    }
	    for (key in obj) {}
	    return key === undefined || hasOwn.call(obj, key);
	};

	//实现多层对象拷贝
	function extend(target, source, deep) {
	    for (var key in source) {
	        // debugger;
	        //如果满足条件 ， 则执行深复制
	        if (deep && (util.isPlainObject(source[key]) || isArray(source[key]))) {
	            if (util.isPlainObject(source[key]) && !util.isPlainObject(target[key])) {
	                target[key] = {};
	            }

	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }

	            //递归
	            extend(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	//将所有未定义的属性从一个或多个对象复制到`target`对象。
	util.extend = function (target) {
	    // debugger;
	    var deep;
	    var args = slice.call(arguments, 1);
	    if (typeof target == 'boolean') {
	        deep = target;
	        target = args.shift();
	    }

	    args.forEach(function (arg) {
	        // debugger;
	        extend(target, arg, deep);
	    });

	    return target;
	};

	//来自MDN
	util.indexOf = function (array, searchElement, fromIndex) {
	    var k;

	    // 1.让o是调用ToObject传递此值作为参数的结果。
	    if (array == null) {
	        throw new TypeError('"array" is null or not defined');
	    }

	    var o = Object(array);

	    // 2.让lenValue是调用参数为“length”的o的Get内部方法的结果。
	    // 3.让len为ToUint32（lenValue）。
	    var len = o.length >>> 0;

	    // 4. 如果 len 为 0, return -1.
	    if (len === 0) {
	        return -1;
	    }

	    // 5.如果参数fromIndex被传递，让n为ToInteger（fromIndex）; 否则令n为0。
	    var n = fromIndex | 0;

	    // 6. 如果 n >= len, return -1.
	    if (n >= len) {
	        return -1;
	    }

	    // 7.如果n >= 0，则令k为n。
	    // 8.如果n <0，令k为len - abs（n）。 如果k小于0，则令k为0。
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    while (k < len) {
	        if (k in o && o[k] === searchElement) {
	            return k;
	        }
	        k++;
	    }
	    return -1;
	};

	// util.indexOf1 = function (array, obj) {
	//     for (var i = 0, len = array.length; i < len; i++) {
	//         if (array[i] === obj) {
	//             return i;
	//         }
	//     }
	//     return -1;
	// };

	exports.default = util;

/***/ }
/******/ ]);