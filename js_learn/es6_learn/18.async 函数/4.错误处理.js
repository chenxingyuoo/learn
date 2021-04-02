/**
 * Created on 2017/5/18.
 */

"use strict";

//如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

async function f() {
    await new Promise(function (resolve, reject) {
        throw new Error('出错了');
    });
}

f()
    .then(v => console.log(v))
    .catch(e => console.log(e))
// Error：出错了


//上面代码中，async函数f执行后，await后面的 Promise 对象会抛出一个错误对象，导致catch方法的回调函数被调用，它的参数就是抛出的错误对象。
// 具体的执行机制，可以参考后文的“async 函数的实现原理”。


//防止出错的方法，也是将其放在try...catch代码块之中。

async function f() {
    try {
        await new Promise(function (resolve, reject) {
            throw new Error('出错了');
        });
    } catch (e) {
    }
    return await('hello world');
}

//如果有多个await命令，可以统一放在try...catch结构中。

//    async function main() {
//        try {
//            var val1 = await firstStep();
//            var val2 = await secondStep(val1);
//            var val3 = await thirdStep(val1, val2);
//
//            console.log('Final: ', val3);
//        }
//        catch (err) {
//            console.error(err);
//        }
//    }


const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await superagent.get('https://api.github.com/users/github');
            break;
        } catch (err) {
        }
    }
    console.log(i); // 3
}

test();

// 上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。


//上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。


//第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法

async function myFunction1() {
    await somethingThatReturnsAPromise()
        .catch(function (err) {
            console.log(err);
        }
}

// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();

//上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。

// 写法一
var t1 = async function (){
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
}

// 写法二
var t2 = async function (){
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
}


//上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。

//第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。


async function dbFuc(db) {
    let docs = [{}, {}, {}];

    // 报错
    docs.forEach(function (doc) {
        await db.post(doc);
    });
}

//上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。

function dbFuc1(db) { //这里不需要 async
    let docs = [{}, {}, {}];

    // 可能得到错误结果
    docs.forEach(async function (doc) {
        await db.post(doc);
    });
}


//上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。

async function dbFuc(db) {
    let docs = [{}, {}, {}];

    for (let doc of docs) {
        await db.post(doc);
    }
}

//如果确实希望多个请求并发执行，可以使用Promise.all方法。

async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));

    let results = await Promise.all(promises);
    console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map((doc) => db.post(doc));

    let results = [];
    for (let promise of promises) {
        results.push(await promise);
    }
    console.log(results);
}