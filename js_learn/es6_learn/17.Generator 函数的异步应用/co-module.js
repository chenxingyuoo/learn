/**
 * Created by chenxingyu on 2017/5/9.
 */
var co = require('co');
var fs = require('fs')
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

//co 模块

var gen = function* () {
    var f1 = yield readFile('../test.md');
    var f2 = yield readFile('../test.html');
    console.log(f1.toString());
    console.log(f2.toString());
};

// co(gen).then(function (){
//     console.log('Generator 函数执行完成');
// });


//处理并发的异步操作

//co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
// 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面

// 数组的写法
co(function* () {
    var res = yield [
        Promise.resolve(1),
        Promise.resolve(2)
    ];
    console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
    var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
    };
    console.log(res);
}).catch(onerror);


//处理并发的异步操作

// co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
// 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面

co(function* () {
    var values = [
        1,2,3,4
    ];
    var a = yield values.map(somethingAsync);
    console.log(a);
});

function* somethingAsync(x) {
    // do something async
    return x * 2
}


//处理 Stream

// Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，
// 就好像“数据流”一样。这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。


const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
    while(true) {
        const res = yield Promise.race([
            new Promise(resolve => stream.once('data', resolve)),
            new Promise(resolve => stream.once('end', resolve)),
            new Promise((resolve, reject) => stream.once('error', reject))
        ]);
        if (!res) {
            break;
        }
        stream.removeAllListeners('data');
        stream.removeAllListeners('end');
        stream.removeAllListeners('error');

        console.log(res.toString().match(/valjean/ig));
        valjeanCount += (res.toString().match(/valjean/ig) || []).length;
    }
    console.log('count:', valjeanCount); // count: 2
});

