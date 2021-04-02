/**
 * Created by chenxingyu on 2016/12/14.
 */
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

//定义事件监听器
event.on('some_event', function() {
    console.log('some_event occured.');
});

//1秒后触发事件
setTimeout(function(){
    event.emit('some_event')
},1000);