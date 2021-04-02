/*
*
 * Created by mac on 15/11/22.


/*再次练习*/
/*var fs =  require('fs');

var data = fs.readFileSync("../mac/project/nodejs_learn/fight/input.txt");

console.log(data.toString());

console.log("程序执行结束~");//同步的

var fs =require('fs');

fs.readFile('../mac/project/nodejs_learn/fight/input.txt',function(err, data){
        if (err) return console.error(err);
        console.log(data.toString());
});

console.log("程序执行完毕");//异步*/



/*//事件处理程序

//引入events模块

var events = require("events");

// 创建 eventEmitter 对象

var eventEmitter = new events.EventEmitter();

//创建事件处理程序

var connectHandler = function(){
    console.log("连接成功");

    //触发data_received 事件
    eventEmitter.emit("data_received");
};


//绑定connection 事件处理程序

eventEmitter.on('connection',connectHandler);


//使用匿名函数 data_received 事件
eventEmitter.on("data_received",function(){
    console.log("数据接受成功！");
});


//触发connection 事件
eventEmitter.emit("connection");

console.log("执行程序完毕！");*/



//EventEmitter 类

//引入events 模块
 /*var events = require("events");

 // 创建 eventEmitter 对象
 var eventEmitter = new events.EventEmitter();

 eventEmitter.on('hello',function(){
 console.log("hello事件触发");
 };

 setTimeout(function(){
 eventEmitter.emit('hello')
 },1000);*/




//引入events 模块
 /*var events = require("events");

 //创建eventEmitter 对象
 var eventhello = new events.EventEmitter();

 var callback = function(stream) {
    console.log('someone connected!');
 };

 eventhello.on('hello',function(arg1,arg2){
     console.log('listen1',arg1,arg2);
 });

 eventhello.on('hello',function(arg1,arg2){
 console.log('listen2',arg1,arg2);
 });


 eventhello.emit('hello','arg1 参数aaa', 'arg2 参数bb');


eventhello.on('hellos',callback);  //这里要用一个变量接收callback,或许有一个具体的函数名 ，才能对它进行移除的事件removeListener ， 直接用匿名函数“不可以”

eventhello.emit('hellos');


eventhello.removeListener('hellos',callback);  //对应上面的callback 才能移除掉

eventhello.emit('hellos');*/






//移除事件
/*var event = require('events');
var server = new event.EventEmitter();
var callback = function(stream) {
    console.log('someone connected!');
};
server.on('connection', callback);
// ...
//先触发事件
server.emit('connection');

//再删除事件
server.removeListener('connection', callback);

 server.emit('connection');  //再触发就没有了这个事件
*/






//以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。

//引入 events 模块
/*var events = require('events').EventEmitter;
 var eventEmitter = new events.EventEmitter();

 //监听器 #1
 var listen1 = function listent1(){
 console.log("监听器 listen1 执行 , 我就是监听器1");
 };

 //监听器二
 var listen2 = function(){
 console.log("监听器 listen2 执行 , 我就是监听器 2");
 }


 //绑定connection 事件，处理函数为listen1
             //添加监听器
 eventEmitter.addListener('connection',listen1);


 //绑定 connection 事件 ， 处理函数为listen2
 eventEmitter.on('connection',listen2);


 //第一次监听 连接的事件   , 这里直接用上边 new 的EventEmitter 变量 不起作用 ,要在require('events')后面加上EventEmitter , 这里在引入模块的时候直接定义了
 var eventListeners = /!*require('events').EventEmitter*!/events.listenerCount(eventEmitter,'connection');

 console.log(eventListeners + '监听器监听连接事件。');

 //触发 connection 事件

 eventEmitter.emit('connection');


 //移除监听绑定的 listen1 事件

 eventEmitter.removeListener('connection', listen1);
 console.log("listen1 不再监听");

 //触发连接事件
 eventEmitter.emit('connection');


 //移除事件之后再次监听连接的事件
 var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
 console.log(eventListeners + "监听器监听连接事件");


 console.log("程序执行完毕");*/


/*var events = require("events");

 var eventer = new events.EventEmitter();

 eventer.emit('error');*/


/*console.log(__filename);*/ // 返回文件的绝对路径

/*
//setTimeout(cb , ms)
function hello(){
    console.log("这是一首简单的小情歌");
}

var time = setTimeout(hello,2000);

clearTimeout(time); //清除定时器
*/


//setInterval(cb , ms)
/*var i = 0;
function hello(){
    i++;
    console.log("我是"+i);
    if(i == 5){
        clearInterval(time);
    }
}

var time = setInterval(hello,2000);*/


/*console.log("hello world");
console.log('byvoid%diovyb');
console.log('byvoid %d iovyb',1995);
console.log('byvoid diovyb',1995);*/

/*console.trace();*/

/*console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
//
console.log("这是一首简单的小情歌");
console.log("这是一首歌");
console.log("这是一童歌");
console.log("这是一山歌");

console.timeEnd('获取数据');

console.info("程序执行完毕。")*/


/*process.on('exit',function(code){

    setTimeout(function(){
        console.log("这段代码永远不会执行")
    },0)

    console.log('退出码为:', code);
});

console.log("程序执行结束");*/


//输出到终端
/*process.stdout.write("hello world \n");

// 通过参数读取
process.argv.forEach(function(val , index , array){
    console.log(val + ':' + index);
});

//获取执行路局

console.log(process.execPath);

// 平台信息

console.log(process.mainModule);*/


// 输出当前目录
/*
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());*/


//常用工具util.inherits
/*
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);*/


//util.inspect

/*var util = require('util');

function Person(){
   this.name = 'chenxignyu',
   this.toString = function(){
       return this.name;
   }
}

var obj = new Person();
console.log(util.inspect(obj));

console.log(util.inspect(obj,true,2,true));*/


/*
//util.isArray(object)

var util = require('util');

console.log(util.isArray([]));

console.log(util.isArray(new Array()));

console.log(util.isArray({}));
*/


/*//util.isRegExp(object)

var util = require('util');

console.log(util.isRegExp(/^some word$/));

console.log(util.isRegExp(new RegExp('another regexp')));

console.log(util.isRegExp({}));*/


//util.isDate(object)
/*var util = require('util');

console.log(util.isDate(new Date()));
// true
console.log(util.isDate(Date(2015)))
// false (without 'new' returns a String)
console.log(util.isDate({}))*/
// false


/*
//util.isError(object)

var util = require("util");

console.log(util.isError(new Error()));

console.log(util.isError(new TypeError()));

console.log(util.isError({'name':'chenxignyu','error':'404'}));
*/
