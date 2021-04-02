/**
 * Created by chenxingyu on 2017/5/9.
 */
var fs = require('fs')

var getData = function (err, data){
    console.log(data);
}

function* doStuff() {
    yield fs.readFile.bind(null, '../test.md','utf8', getData);
    yield fs.readFile.bind(null, '../test.html','utf8', getData);
}


for (var task of doStuff()) {
    // task是一个函数，可以像回调函数那样使用它
    console.log(task());
}

/**
 *  =================================
 */

function doStuff1() {
    return [
        fs.readFile.bind(null, 'test.md','utf8', getData),
        fs.readFile.bind(null, 'test.html','utf8', getData),
    ];
}

for (var task of doStuff1()) {
    console.log(task);
    // task是一个函数，可以像回调函数那样使用它
    console.log(task());
}

/**
 *  ============= yield 表达式 ====================
 */

// yield 取出嵌套数组的成员
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
};

for (var f of flat(arr)) {
    console.log(f);
}
// 1, 2, 3, 4, 5, 6

/**
 *  ==============与 Iterator 接口的关系 ===================
 */

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

[...myIterable] // [1, 2, 3]

//上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了

//Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

function* gen(){
    // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true

/**
 *  ==============next 方法的参数===================
 */
//yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值

function* f() {
    for(var i = 0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
    }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }


function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


/**
 *  =============for...of 循环====================
 */

//for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法
function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5

//这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中


//利用 Generator 函数和for...of循环，实现斐波那契数列的例子
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
}

//利用for...of循环，可以写出遍历任意对象（object）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe


//加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。

function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

//除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
    console.log(n)
}
// 1
// 2

/**
 *  ===============yield* 表达式==================
 */

//yield*命令可以很方便地取出嵌套数组的所有成员
function* iterTree(tree) {
    if (Array.isArray(tree)) {
        for(let i=0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
        }
    } else {
        yield tree;
    }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
    console.log(x);
}
// a
// b
// c
// d
// e

//使用yield*语句遍历完全二叉树

// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
    if (t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

// 下面生成二叉树
function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) {
        return new Tree(null, array[0], null);
    }
    return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
    result.push(node);
}

// result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']



/**
 *  ==============含义===================
 */
//Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机

var ticking = true;
var clock = function() {
    if (ticking)
        console.log('Tick!');
    else
        console.log('Tock!');
    ticking = !ticking;
}

//Generator

var clock1 = function* () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};

/**
 *  ===============应用==================
 */

//Ajax

function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
    makeAjaxCall(url, function(response){
        it.next(response);
    });
}

var it = main();
it.next();


//fetch请求
var fetch = require('node-fetch');

function* gen(){
    debugger;
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result);
}
var g = gen();
var result = g.next();

result.value.then(function(data){
    debugger;
    return data.json();
}).then(function(data){
    debugger;
    g.next(data);
});


//控制流管理
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        var value5 = yield step4(value4);
        // Do something with value4
    } catch (e) {
        // Handle any error from step1 through step4
    }
}

//然后，使用一个函数，按次序自动执行所有步骤。

scheduler(longRunningTask('10'));

function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}

// 注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。
// 因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成


//利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。

var jobs = []
jobs.push({steps : [function(){ return {id:1} }]})
jobs.push({steps : [function(){ return {id:2} }]})
jobs.push({steps : [function(){ return {id:3} }]})


function* iterateSteps(steps){
    for (var i=0; i< steps.length; i++){
        var step = steps[i];
        yield step();
    }
}

function* iterateJobs(jobs){
    for (var i=0; i< jobs.length; i++){
        var job = jobs[i];
        yield* iterateSteps(job.steps);
    }
}

for (var step of iterateJobs(jobs)){
    console.log(step.id);
}