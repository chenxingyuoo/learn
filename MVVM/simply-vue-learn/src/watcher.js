/**
 * Created by chenxingyu on 2016/11/25.
 */

var Dep = require('./dep')

module.exports = Watcher

function Watcher(vm, exp, cb){
    debugger;
    this.vm = vm
    vm._watchers.push(this)
    this.exp = exp
    this.cb = cb
    this.deps = []
    this.depIds = {}
    this.getter = function (vm) {
        debugger;
        return vm[exp]   //获取vm里面的属性 ，如果该属性是 Object.defineProperty方法定义的 ，并且有定义 get 方法 ， 则会自动执行 get 方法
    }
    this.setter = function (vm, value) {
        vm[exp] = value
    }

    this.value = this.get()
}

Watcher.prototype.get = function (){
    debugger;
    Dep.target = this
    var value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
}

Watcher.prototype.set = function (value) {
    debugger;
    this.setter.call(this.vm, this.vm, value)
}

Watcher.prototype.addDep = function (dep){
    debugger;
    var id = dep.id
    if (!this.depIds[id]) {
        dep.addSub(this)
        this.depIds[id] = true
        this.deps.push(dep)
    }
}

Watcher.prototype.update = function () {
    debugger;
    this.run()
}

Watcher.prototype.run = function () {
    debugger;
    var value = this.get()
    if (this.value !== value) {
        var oldValue = this.value
        this.value = value
        this.cb.call(this.vm, value, oldValue)
    }
}