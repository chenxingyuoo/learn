/**
 * Created by mac on 15/12/9.
 */

/*var fs =  require('fs');

var data = fs.readFileSync("input.txt");

console.log(data.toString());

console.log("程序执行结束~");*/  //同步的



/*var fs = require('fs');

fs.readFile("inptx.txt",function(err , data){
    if(err) return console.log(err);

    console.log(data.toString());

});

console.log("程序执行完成！");*/  //异步


//事件处理程序

//引入events模块

/*var events = require("events");

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




/*var fs = require("fs");

 fs.readFile('input.txt', function (err, data) {
 if (err) return console.error(err);
 console.log(data.toString());
 });

 console.log("程序执行结束!");*/



/*//事件处理程序

 //引入events模块

 var events = require('events');

 // 创建 EventEmitter 对象

 var eventEmitter = new events.EventEmitter();

 //创建事件处理程序

 var connectHandler = function conneected(){
 console.log("连接成功");

 //来这里触发 data_received事件
 eventEmitter.emit('data_received');

 };

 //绑定 connection 事件处理程序

 eventEmitter.on('connection',connectHandler);

 //使用匿名函数绑定 data_received 事件
 eventEmitter.on('data_received',function(){
 console.log("数据接收成功");
 });

 //触发 connection 事件

 eventEmitter.emit('connection');

 console.log("程序执行完毕");*/



/*//node应用程序是如何工作的？

 var fs = require('fs');

 fs.readFile('txt.txt',function(err , data){
 if(err){
 console.log(err.stack);
 return;
 }
 console.log(data.toString());

 });

 console.log("程序执行完毕了吗?");*/

/*
 var EventEmitter = require('events').EventEmitter;
 var event = new EventEmitter();
 event.on('some_event', function() {
 console.log('some_event 事件触发');
 });
 setTimeout(function() {
 event.emit('some_event');
 }, 1000);
 */

/*//引入events模块
 var events = require('events');

 //创建EventEmitter 对象
 var eventEmitter = new events.EventEmitter();

 //创建事件处理程序
 var connectHandler = function(){
 console.log("连接成功");

 //触发hello 事件
 eventEmitter.emit('hello');
 }

 //绑定connection事件处理程序
 eventEmitter.on('connection',connectHandler);

 // 使用匿名函数绑定 data_received 事件
 eventEmitter.on('hello',function(){
 console.log('数据接收成功。');
 })

 //触发connection事件
 eventEmitter.emit('connection');



 console.log("程序处理成功");*/


/*var fs = require('fs');

 fs.readFile('input.txt',function(err,data){
 if(err){
 console.log(err.stack);
 return;
 }

 console.log(data.toString());
 });

 console.log("程序执行完毕");*/





//EventEmitter 类

/*//引入events 模块
 var events = require("events").EventEmitter;

 // 创建 eventEmitter 对象
 var eventEmitter = new events.EventEmitter();

 eventEmitter.on('hello',function(){
 console.log("hello事件触发");
 })

 setTimeout(function(){
 eventEmitter.emit('hello')
 },1000)*/



/*//引入events 模块
 var events = require("events");

 //创建eventEmitter 对象
 var eventhello = new events.EventEmitter();

 eventhello.on('hello',function(arg1,arg2){
 console.log('listen1',arg1,arg2);
 });

 eventhello.on('hello',function(arg1,arg2){
 console.log('listen2',arg1,arg2);
 })

 eventhello.on('hellos',function(arg1,arg2){
 console.log('listen2',arg1,arg2);
 })

 eventhello.emit('hellos','arg1 参数aaa', 'arg2 参数bb');

 eventhello.emit('hello','arg1 参数', 'arg2 参数');

 removeListener('hello',function(){
 console.log("移除事件成功");
 })*/



//以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。

//引入 events 模块
/*var events = require('events');
 var eventEmitter = new events.EventEmitter();

 //监听器 #1
 var listen1 = function listent1(){
 console.log("监听器 listen1 执行");
 };

 //监听器二
 var listen2 = function(){
 console.log("监听器 listen2 执行.");
 }


 //绑定connection 事件，处理函数为listen1

 eventEmitter.addListener('connection',listen1);


 //绑定 connection 事件 ， 处理函数为listen2
 eventEmitter.on('connection',listen2);


 //第一次监听 连接的事件
 var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');

 console.log(eventListeners + '监听器监听连接事件。');

 //触发 connection 事件

 eventEmitter.emit('connection');


 //移除监听绑定的 listen2 事件

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