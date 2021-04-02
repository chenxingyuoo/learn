/**
 * Created by chenxingyu on 2016/12/29.
 */
import util from './util';
console.log(util);

var emptyArray = [];
var concat = emptyArray.concat;
var filter = emptyArray.filter;
var slice = emptyArray.slice;
var ARGS_RE = /\S+/g;

function mixin(obj, Constructor) {
    var instance = new Constructor(), mixto = obj && obj.prototype || obj || {};
    util.extend(mixto, instance);
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

var Handlers = function Handlers(){
    var optionsCache = {};
    var STATUS = {
        INIT: 0,
        FIRING: 1,
        FIRED: 2
    };

    function createOptions(options){
        var object = optionsCache[options] = {};
        util.each(options.match(ARGS_RE), function(flag) {
            object[flag] = true;
        });
        return object;
    }

    function Constructor(options){
        // options.once：确保处理程序只能触发一次
        // options.memory：在状态更改为最新“记忆”值后添加的调用处理程序
        this.options = typeof options === "string" ? optionsCache[options] || createOptions(options) : util.extend({}, options);
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
        _fire: function (args){
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
            util.each(args[1], function (args1, index){
                if (util.isFunction(args1) && !util.isFunction(fn)) {
                    fn = args1;
                    this.splice(index, 1);
                }
            });

            //触发回调函数
            for(; list && this.firingIndex < this.firingLength; this.firingIndex++){
                //如果指定回调函数触发
                var index = util.indexOf(this.list, fn);
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
        add: function() {
            var that = this;
            // debugger;
            if (this.list) {
                // debugger;
                //缓存列表的当前长度
                var start = this.list.length;
                (function add(args) {
                    util.each(args, function (arg){
                        var type = util.type(arg);
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
        remove: function (){
            if (this.list) {
                util.each(arguments,function (arg){
                    var index = util.indexOf(this.list, arg);
                    while (index > -1) {
                        this.list.splice(index, 1);
                        if (this.status === STATUS.FIRING) {
                            if (index <= this.firingLength) {
                                this.firingLength = this.firingLength - 1;
                            }
                            if (index <= this.firingIndex){
                                this.firingIndex = this.firingIndex - 1;
                            }
                        }

                        index = util.indexOf(this.list, arg, index)
                    }
                }, this);
            }
            return this;
        },
        //删除所有回调函数 ， 不需要接收 arguments
        removeAll: function (){
            if (this.list) {
                // this.firingIndex = 0;
                return this.empty();
            }
            return this;
        },
        has: function (handler){
            var list = this.list;
            return handler ? util.indexOf(list, handler) > -1 : !!(list && list.length);
        },
        empty: function (){
            this.list.length = 0;
            this.firingLength = 0;
            return this;
        },
        disable: function (){
            this.list = this.stack = this.dataCache = null;
            return this;
        },
        lock: function (){
            this.stack = null;
            if (!this.dataCache) {
                this.disable();
            }
            return this;
        },
        fireWith: function (context, args){
            var notFired = this.status !== STATUS.FIRED;
            var firing = this.status === STATUS.FIRING;
            var list = this.list;
            var stack = this.stack;
            args = args || [];
            args = [ context, args];
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
Event.prototype.on = function(events) {
    var args = slice.call(arguments, 1);
    var iterator = function (event, args){
        var handlers = this.handlers[event];
        if (!handlers) {
            handlers = this.handlers[event] = new Handlers();
        }
        handlers.add.apply(handlers, args);
    };

    //字符串
    if (typeof events === "string") {
        util.each(events.match(ARGS_RE), function (event){
            iterator.call(this, event, args);
        }, this);
    } else {
        util.each(events, function (handler, event){
            iterator.call(this, event, [handler]);
        }, this);
    }
    return this;
};

//移除单个事件 ， arguments指定回调函数
Event.prototype.off = function(events) {
    var args = slice.call(arguments, 1);
    var iterator = function (event, args){
        var handlers = this.handlers[event];
        if (handlers) {
            handlers.remove.apply(handlers, args);
        }
    };

    //字符串
    if (typeof events === "string") {
        util.each(events.match(ARGS_RE), function (event){
            iterator.call(this, event, args);
        }, this);
    } else {
        util.each(events, function (handler, event){
            iterator.call(this, event, [handler]);
        }, this);
    }

    return this;
};

//移除所有事件
Event.prototype.offAll = function (events){
    var args = slice.call(arguments, 1);
    var iterator = function (event, args){
        var handlers = this.handlers[event];
        if (handlers) {
            handlers.removeAll.apply(handlers, args);
        }
    };

    //字符串
    if (typeof events === "string") {
        util.each(events.match(ARGS_RE), function (event){
            iterator.call(this, event, args);
        }, this);
    } else {
        util.each(events, function (handler, event){
            iterator.call(this, event, [handler]);
        }, this);
    }

    return this;
};

//触发事件 ， 所有回调都会被调用
Event.prototype.trigger = function(events) {
    debugger;
    var args = slice.call(arguments, 1);
    util.each(events.match(ARGS_RE), function (event){
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