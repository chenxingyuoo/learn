/**
 * Created by chenxingyu on 2016/12/15.
 */

//JavaScript 中有一个特 的对象， 为    (Global Object)，它及其所有 性都可 以在程序的任何地方访问，
// 。在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，
// 所有全局变量(除了 global 本身以外)都是 global 对象的 性。
// 我们在 Node.js 中能  接访问到对象通常都是 global 的 性，如 console、process 等，下面 一介绍。

console.log(global);


//process 是一个全局变量，  global 对象的 性。它用于 述 前 Node.js 进程   的对象，提供了一个与操作系统的简 接口。
// 通常在你写本地  行程序的时 ，少不了要和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

//process.argv是  行参数数 ，第一个  是 node，第2个  是 本文件 ，从第3个  开始每个  是一个运行参数。

console.log(process.argv);

//process.stdout是标准输出流，通常我们使用的 console.log()  标准输出打  字符，而 process.stdout.write() 函数提供了更 层的接口。

//process.stdin是标准输入流， 始时它是被  的，要想从标准输入读取数据， 你   复流，并 动编写流的事件 应函数。

process.stdin.resume();

process.stdin.on('data', function (data) {
    process.stdout.write('read from console: ' + data.toString());
});

//process.nextTick(callback)的功能是为事件 环设置一项任务，Node.js 会在 下次事件 环调 应时调用 callback。

// 学者很可能不理解这个函数的作用，有什么任务不能在 下 行完，需要交给下次事 7 件 环 应来做  我们讨论过，
// Node.js 适合 I/O 密集 的应用，而不是计 密集 的应用， 因为一个 Node.js 进程只有一个 程，
// 因此在任何时 都只有一个事件在 行。如果这个事 件 用大量的 CPU 时间， 行事件 环中的下一个事件就需要等 很
// ，因此 Node.js 的一 个编程 则就是 量  每个事件的 行时间。process.nextTick() 提供了一个这 的 工具，可以 复杂的工作  ，
// 变成一个个 小的事件。
function doSomething(args, callback) {
    somethingComplicated(args);
    callback();
}

doSomething(function onEnd() {
    compute();
});

//我们假设 compute() 和 somethingComplicated() 是两个 为 时的函数，
// 以上 的程序在调用 doSomething() 时会先 行 somethingComplicated()，
// 后  调用 回调函数，在 onEnd() 中 会 行 compute()。
// 下面用 process.nextTick() 改写上 面的程序:

function doSomething(args, callback) {
    somethingComplicated(args);
    process.nextTick(callback);
}

doSomething(function onEnd() {
    compute();
});


//改写后的程序会 上面 时的操作 分为两个事件， 减少每个事件的运行时间，提高事件响应  。

// 我们 讨了process对象常用的几个成员，除此之外process还 示了process.platform、 process.pid、
// process.execPath、process.memoryUsage() 等方法，以及 POSIX 进程   应机制。
// 有兴趣的读者可以访问 http://nodejs.org/api/process.html 了解详细 内容。








