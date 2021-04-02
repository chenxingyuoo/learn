/**
 * Created by chenxingyu on 2016/12/15.
 */

// events 是 Node.js 最重要的模块，没有之一 ， 因是 Node.js 本身架构就是事件式 的，而它提供了唯一的接口，所以堪称Node.js 事件编程的基石。
// events 模块不仅用于用户代码与 Node.js 下层事件 环的交互，还几乎被所有的模块以来。

// 事件发射器

// events 模块只提供了一个对象: events.EventEmitter。EventEmitter
// 的核心就 是事件发射与事件监听器功能的封装。EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符 ，通常表达一定的语义。
// 对于每个事件，EventEmitter 支持若干个事件监听器。 事件发射时，注 到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('someEvent', function (arg1, arg2) {
    console.log('listener1', arg1, arg2);
});

emitter.on('someEvent', function (arg1, arg2) {
    console.log('listener2', arg1, arg2);
});

emitter.emit('someEvent','byvoid', 1991);
// listener1 byvoid 1991
// listener2 byvoid 1991

// emitter 为事件 someEvent 注册了两个事件监听器， 后发射了 someEvent 事件。运行结果中可以看到两个事件监听器回调函数被先后调用。
// 这就是EventEmitter最简 的用法。接下来我们介绍一下EventEmitter常用的API。

//  EventEmitter.on(event, listener) 为指定事件注测一个事件听器，接受一个字
//    符˘ event 和一个回调函数 listener。

// EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件，传
// 递ᔩ࣯可ᤤ参数到事件监听器的参数表。

// EventEmitter.once(event, listener) 为指定事件注一个事件监听器，事件监听器最多只会触发一次，触发后立即解除该ᄢ听器。

// EventEmitter.removeListener(event, listener) 移除指定事件的౼个事件监听器，listener 是该事件已经注过的事件监听器。

// EventEmitter.removeAllListeners([event]) ሧ除所有事件的所有ᄢ听器，如果指定 event，则ሧ除指定事件的所有ᄢ听器。




// error 事件

// EventEmitter 定 了一个特 的事件 error，它包 了 错误 的语 ，我们在遇到 异常的时 通常会发射 error 事件。
// error 被发射时，EventEmitter 规定如果没有  应的 听器，Node.js 会 它 作异常， 出程序并打 调用 。
// 我们一 要为会发射 error 事件的对象设置 听器，避免遇到错误后 个程序  。例如:

emitter.emit('error');

//运行时会显示以下错误:

//throw err;

//Error: Uncaught, unspecified "error" event. (undefined)

//   EventEmitter

//大多数时 我们不会 接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

//为什么要这 做   因有两点。首先，具有 某个实体功能的对象实现事件符合语 ， 事件的 听和发射应该是一个对象的方法。
// 其次 JavaScript 的对象机制是基于原型的，支持 部分多重继 ，继承 EventEmitter 不会打乱对象原有的继承关系。





