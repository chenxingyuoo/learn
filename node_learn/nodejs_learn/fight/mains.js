/**
 * Created by mac on 16/1/16.
 */
/*
var path = require("path");

// 格式化路径/Users/mac/project/nodejs_learn/fight
console.log('normalization : ' + path.normalize('/Users/mac/project/nodejs_learn/fight/..'));

// 连接路径
console.log('joint path : ' + path.join('/Users', 'mac', 'project/nodejs_learn', 'fight', '..'));

// 转换为绝对路径
console.log('resolve : ' + path.resolve('mains.js'));

// 路径中文件的后缀名
console.log('ext name : ' + path.extname('mains.js'));


console.log( __dirname )*/


/*
var dns = require('dns');

dns.lookup('www.github.com', function onLookup(err, address, family) {
    console.log('ip 地址:', address);
    dns.reverse(address, function (err, hostnames) {
        if (err) {
            console.log(err.stack);
        }

        console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
    });
});*/



var EventEmitter = require("events").EventEmitter;
var domain = require("domain");

var emitter1 = new EventEmitter();

// 创建域
var domain1 = domain.create();

domain1.on('error', function(err){
    console.log("domain1 处理这个错误 ("+err.message+")");
});

// 显式绑定
domain1.add(emitter1);

emitter1.on('error',function(err){
    console.log("监听器处理此错误 ("+err.message+")");
});

emitter1.emit('error',new Error('通过监听器来处理'));

emitter1.removeAllListeners('error');

emitter1.emit('error',new Error('通过 domain1 处理'));

var domain2 = domain.create();

domain2.on('error', function(err){
    console.log("domain2 处理这个错误 ("+err.message+")");
});

// 隐式绑定
domain2.run(function(){
    var emitter2 = new EventEmitter();
    emitter2.emit('error',new Error('通过 domain2 处理'));
});


domain1.remove(emitter1);
emitter1.emit('error', new Error('转换为异常，系统将崩溃!'));