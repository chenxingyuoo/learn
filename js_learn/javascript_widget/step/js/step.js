/**
 * Created by chenxingyu on 2017/1/7.
 */
(function(global, factory) {
    //amd写法
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
        //cmd 写法 ， 暴露接口
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        //否则暴露给window
        global.Step = factory();
    }
})(this, function (){
    'use strict';

    var emptyArray = [];
    var concat = emptyArray.concat;
    var filter = emptyArray.filter;
    var slice = emptyArray.slice;
    // 返回对象的类型
    var type = function type(obj) {
        var type;
        if (obj == null) {
            type = String(obj);
        } else {
            type = toString.call(obj).toLowerCase();
            type = type.substring(8, type.length - 1);
        }
        return type || "object";
    };
    //target 旧的 source新的
    var extend = function extend(target, source) {
        for (var i in source) {
            target[i] = source[i];
        }
        return target;
    };
    var nothing = function nothing(){
    };
    var ø = Object.create(null);

    var defaults = {
        onEnd : nothing,
        onStart : nothing
    };

    /**
     *
     * @param opts
     * @constructor
     */
    function Step(opts){
        opts = opts || {};
        this.list = [];
        this.pointer = 0;
        this.loopNum = 0;
        this.loop = true;
        this.init(opts)
    }


    Step.prototype = {
        init : function init(opts){
            defaults = extend(defaults, opts);
            for (var key in defaults) {
                this[key] = defaults[key];
            }
        },
        //添加
        add : function add(){
            var cur;
            var arg = slice.call(arguments);
            for (var i = 0, len = arg.length; i < len; i++) {
                cur = arg[i];
                if (type(cur) === 'array') {
                    this.list = this.list.concat(cur);
                } else {
                    this.list.push(cur);
                }
            }
        },
        //下一步
        next : function next(){
            debugger;
            this.pointer = this.pointer + 1;
            return this.run.apply(this, slice.call(arguments));
        },

        //上一步
        prev : function prev(){
            this.pointer = this.pointer - 1;
            return this.run.apply(this, slice.call(arguments))
        },

        //执行当前步骤
        cur : function (){
            if (this.pointer <= -1){
                this.pointer = 0;
            }
            return this.run.apply(this, slice.call(arguments))
        },

        //步骤执行
        run : function run(){
            var curPointer;  //当前列表指针
            var result;
            var isEnd;
            var isStart;
            var list = this.list;
            var arg = slice.call(arguments);
            var pointer = this.pointer;

            if (pointer < 0) {
                this.pointer = list.length + (pointer <= -1 ? 1 : 0) + pointer;
            }

            curPointer = list[this.pointer];

            if (!curPointer){
                return false;
            }

            isStart = (this.pointer == 0);
            isEnd = (this.pointer == list.length - 1);

            //结束
            if (isEnd) {
                if (this.loop){
                    this.pointer = -1;
                    this.loopNum = this.loopNum + 1;
                } else {
                    this.pointer = this.pointer - 1;
                }
            }

            //如果是函数
            if (type(curPointer) == 'function'){
                result = curPointer.apply(ø, arg);
            } else {
                result = curPointer;
            }

            //回调函数
            isStart ? this.onStart() : '';
            isEnd ? this.onEnd() : '';

            return result;
        },
        //移动指针
        move : function (num){
            if (typeof num !== 'number') {
                throw new TypeError('"num" is number or not defined');
            }

            if (num >= 0) {
                this.pointer = num;
            }
        }
    };

    return Step;
});
