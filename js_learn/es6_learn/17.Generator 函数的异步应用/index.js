/**
 * Created by chenxingyu on 2017/5/8.
 */
"use strict";

const fs = require('fs')

const getData =  (err, data) => {
    console.log(data);
}

function* doStuff() {
    yield fs.readFile.bind(null, '../test.md','utf8', getData);
    yield fs.readFile.bind(null, '../test.html','utf8', getData);
}

//test.md 文件太大导致 读完 test.html 才读完 test.md
for (let task of doStuff()) {
    // task是一个函数，可以像回调函数那样使用它
    // console.log(task());
}

//Thunk 函数现在可以用于 Generator 函数的自动流程管理

//利用 Thunk 函数
const thunkify = require('thunkify');
const readFileThunk = thunkify(fs.readFile);
const throwErr = (err) => {
    if (err) {
        throw err;
    }
}

const gen = function* (){
    let r1 = yield readFileThunk('../test.md');
    console.log(r1.toString());
    let r2 = yield readFileThunk('../test.html');
    console.log(r2.toString());
};

let g = gen();

//手动执行上面这个 Generator 函数
// let r1 = g.next();
// r1.value(function (err, data) {
//     throwErr(err);
//     let r2 = g.next(data);
//     r2.value(function (err, data) {
//         throwErr(err);
//         g.next(data);
//     });
// });

function run(fn) {
    var g = fn();
    //递归来自动完成这个过程
    function next(err, data) {
        var result = g.next(data);
        if (result.done) {
            return;
        }
        result.value(next);
    }

    next();
}

run(g);



//基于 Promise 对象的自动执行
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) {
                return reject(error);
            }
            resolve(data);
        });
    });
};

var gen1 = function* (){
    var f1 = yield readFile('../test.md');
    var f2 = yield readFile('../test.html');
    console.log(f1.toString());
    console.log(f2.toString());
};

function run1(gen){
    var g = gen();

    function next(data){
        var result = g.next(data);
        if (result.done) {
            return result.value;
        }
        result.value.then(function(data){
            next(data);
        });
    }

    next();
}

run1(gen1);