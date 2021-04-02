/**
 * Created by chenxingyu on 2017/1/3.
 */
/**
 *
 * @param name
 * @constructor
 */
function LazyMan(name) {
    debugger;
    if (!(this instanceof LazyMan)) {
        return new LazyMan(name);
    }
    var self = this;
    self.tasks = [];
    var fn =(function(name) {
        return function(){
            console.log("Hi! This is " + name + "!");
            self.next();
        }
    })(name);

    self.tasks.push(fn);

    setTimeout(function(){
        self.next();
    }, 0); // 在下一个事件循环启动任务
}

LazyMan.prototype = {
    //事件调度函数
    next : function (){
        var fn = this.tasks.shift();
        fn && fn();
    },
    eat : function(name) {
        var self = this;
        var fn =(function(name){
            return function(){
                console.log("Eat " + name + "~");
                self.next()
            }
        })(name);
        this.tasks.push(fn);
        return this; // 实现链式调用
    },
    sleep: function (time){
        var self = this;
        var fn = (function(){
            return function() {
                setTimeout(function(){
                    console.log("Wake up after " + time + "s!");
                    self.next();
                }, time * 1000);
            }
        })();

        this.tasks.push(fn);
        return this;
    },
    sleepFirst: function (time){
        var self = this;
        var fn = (function() {
            return function() {
                setTimeout(function() {
                    console.log("Wake up after " + time + "s!");
                    self.next();
                }, time * 1000);
            }
        })();
        this.tasks.unshift(fn);
        return this;
    }
};