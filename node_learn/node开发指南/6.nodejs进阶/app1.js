/**
 * Created by chenxingyu on 2016/12/19.
 */

// 控制流

//基于异步 I/O 的事件式编程容易将程序的 辑 得 零 落，给控制流的 理制
// 。让我们通过下面的例 来说 这个问题。

// 循环的陷阱

// Node.js 的异步机制由事件和回调函数实现，一开始接触可能会感觉违反常规，但习惯以后就会发现还是很简单的。
// 而这之中其实暗藏了不少陷阱，一个很容易遇到的问题就是循环中的回调函数， 初学者经常容易掉入这个圈套  。让我们从一个例子开始说 这个问题

var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];

for (var i = 0, len = files.length; i < len; i++) {
    fs.readFile(files[i], 'utf-8', function (err, data) {

        // console.log(files);
        // console.log(i);
        // console.log(files[i]);

        if (err) {
            console.error(err);
        } else {
            console.log(files[i] + ': ' + data);
        }
    });
}

//输出结果

// undefined: aaa
// undefined: bbb
// undefined: ccc


//我们期望的输出结果就是
// a.txt: AAA
// b.txt: BBB
// c.txt: CCC


//因为是在回调函数里面引用 i 的值 ， 这时for循环已经结束了 ， 所有 i 每一次都是3

//用闭包解决  -》 不推荐
for (var i = 0, len = files.length; i < len; i++) {
    (function (i){
        fs.readFile(files[i], 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log(files[i] + ': ' + data);
            }
        });
    })(i);
}


//forEach解决
files.forEach(function (item, index){
    fs.readFile(item, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(item + ': ' + data);
        }
    });
});

//存储变量解决
for (var i = 0, len = files.length; i < len; i++) {
    var file = files[i];
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(file + ': ' + data);
        }
    });
}



// 解决控制流难题

// 除了 环的  ，Node.js 异步式编程还有一个显 的问题， 深层的回调函数  。 在这种  下，我们很难 看基本控制流结构一 一 看清回调函数之间的关系，
// 因此 程 序规模 大时   取 段   合 ，以实现更加优 、可读的代码。这个问题本身没有   见 的解决方法，只能通过改变设计模式，时 注意   辑之间的 合关系来解决。

//除此之外，还有许多项目试图解决这一难题。async 是一个控制流解 模块，它提供了 async.series、async.parallel、async.waterfall 等函数，
// 在实现复杂的 辑时使 用这些函数代 回调函数  可以让程序变得更清 可读且易于维 ，但你  遵 它的编 程风格。

// streamlinejs和jscex则 用了更高级的 段，它的思想是 变同步为异步 ，实现了一个 JavaScript 到JavaScript 的编译器，
// 使用 可以用同步编程的模式写代码，编译后 行时却是 异步的。

// eventproxy 的思路与前面两者区别更大，它实现了对事件发射器的深  装， 用一种 完全基于事件  松散耦 合的方式来实现控制流的梳理。

// 无论是以上 种解决 段，都不是 非 侵入性的 ，也就是说它对你编程模式的影响是 非常大的，你几乎不可能无代价地在使用了一种模式很久以后从容地换成另一种模式，
// 或者直接结合使用两种模式。而且它们都是在解决了深层嵌套的回调函数可读性问题的同时，引入了其他复杂的语法，带来了另一种可读性的降低  。
// 所以，是否使用，使用哪种方案，在决定之前是需要仔细斟酌研究的。

