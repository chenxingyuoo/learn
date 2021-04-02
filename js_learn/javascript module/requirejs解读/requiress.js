/**
 * Created by mac on 16/7/14.
 */
function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    this.filename = null;
    this.loaded = false;
    this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);

//上面代码中，Node 定义了一个构造函数 Module，所有的模块都是 Module 的实例。可以看到，当前模块（module.js）也是 Module 的一个实例。
//每个实例都有自己的属性。下面通过一个例子，看看这些属性的值是什么。新建一个脚本文件 a.js 。