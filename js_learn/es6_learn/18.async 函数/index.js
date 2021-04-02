/**
 * Created on 2017/5/18.
 */

"use strict";

//ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

//async 函数是什么？一句话，它就是 Generator 函数的语法糖。


//前文有一个 Generator 函数，依次读取两个文件。

var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};
//
// var gen = function* () {
//     var f1 = yield readFile('../test.md');
//     var f2 = yield readFile('../test.md');
//     console.log(f1.toString());
//     console.log(f2.toString());
// };

//写成async函数，就是下面这样。

var asyncReadFile = async function () {
    var f1 = await readFile('../test.md');
    var f2 = await readFile('../test.md');
    console.log(f1.toString());
    console.log(f2.toString());
};

var asyncFile = asyncReadFile();
debugger;

//一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

// async函数对 Generator 函数的改进，体现在以下四点。

//（1）内置执行器。

//Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。

//上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。

//（2）更好的语义。

//async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

// （3）更广的适用性。

// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

// （4）返回值是 Promise。

// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。

// 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。


//基本用法

//async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。


function getStockSymbol(name) {
    return new Promise((resolve) => {
        resolve(name)
    });
}

function getStockPrice(symbol){

}

async function getStockPriceByName(name) {
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPrice(symbol);
    return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
    console.log(result);
});

//上面代码是一个获取股票报价的函数，函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。









