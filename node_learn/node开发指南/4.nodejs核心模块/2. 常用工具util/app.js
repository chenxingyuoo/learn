/**
 * Created by chenxingyu on 2016/12/15.
 */

//util 是一个 Node.js 核心模块，提供常用函数的集合，用于  核心 JavaScript 的功能过于精简的不足。


var util = require('util');

// util.inherits(constructor, superConstructor)是一个实现对象间继承的函数。JavaScript 的面向对象特性是基于原型的，
// 与常见的基于类的不同。JavaScript 没有 提供对象继 的语言级别特性，而是通过  复制来实现的，具体细节我们在附录A中讨论，
// 在这里我们只介绍 util.inherits 的用法，示例如下:

function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function () {
        console.log('Hello ' + this.name);
    };
}

Base.prototype.showName = function () {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}

//Sub 继承 Base的原型
util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName(); //base
objBase.sayHello(); //hello base


var objSub = new Sub();
objSub.showName(); //sub

// util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。
// 它至少接受一个参数 object，即要转换的对象。

// showHidden 是一个可 参数，如果值为true，将会输出更多    。
// 如果color 值为 true，输出格式将会以 ANSI   编码，通常用于在终端显示更漂亮 的 果。
// 特别要指出的是，util.inspect 并不会简 地 接 对象  为字符 ， 使该对
// depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出  的多 少。如果不指定depth， 认会递归2层，指定为 null 表示将不 递归层数完   对象。
// 象定 了 toString 方法也不会调用。

function Person() {
    this.name = 'byvoid';
    this.toString = function () {
        return this.name;
    };
}

var obj = new Person();

console.log(util.inspect(obj));
// Person { name: 'byvoid', toString: [Function] }
console.log(util.inspect(obj, true, 2, true));
// Person {
// name: 'byvoid',
//     toString: { [Function]
//       [length]: 0,
//       [name]: '',
//       [arguments]: null,
//       [caller]: null,
//       [prototype]: { [constructor]: [Circular] }
//     }
// }

// 除了以上我们介绍的几个函数之外，util还提供了util.isArray()、util.isRegExp()、 util.isDate()、util.isError() 4个类型测试工具，
// 以及 util.format()、util.debug() 等工具。有兴趣的读者可以访问 http://nodejs.org/api/util.html 了解详细内容。