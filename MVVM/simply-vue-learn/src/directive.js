/**
 * Created by chenxingyu on 2016/11/25.
 */

var Watcher = require('./watcher')

module.exports = Directive

function Directive(descriptor, vm, el){
    debugger;
    this.vm = vm
    this.el = el
    this.descriptor = descriptor
    this.name = descriptor.name
    this.expression = descriptor.exp
}

//执行 descriptor 对象里面 bind 、 update 方法 ，  实例化 Watcher
Directive.prototype._bind = function (){
    debugger;
    var name = this.name
    var descriptor = this.descriptor

    if (this.el && this.el.removeAttribute) {
        this.el.removeAttribute(descriptor.attr || 'v-' + name)
    }

    var def = descriptor.def
    this.update = def.update
    this.bind = def.bind
    if (this.bind) this.bind()

    //传给 Watcher 的回调函数
    this._update = function (val) {
        this.update(val)
    }.bind(this)

    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update)
    this.update(watcher.value)
}

//
Directive.prototype.set = function (value) {
    debugger;
    this._watcher.set(value)
}

//事件绑定
Directive.prototype.on = function (event, handler) {
    debugger;
    this.el.addEventListener(event, handler, false)
}