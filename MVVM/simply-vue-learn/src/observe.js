/**
 * Created by chenxingyu on 2016/11/28.
 */
var Dep = require('./dep')

module.exports = function observe(value, vm) {
    debugger;
    var ob
    if (value.hasOwnProperty('__ob__')) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    if (ob && vm) {
        ob.addVm(vm)
    }
    return vm
}

function Observer(value){
    debugger;
    this.value = value
    Object.defineProperty(value, '__ob__', {
        value : this,
        enumerable : false,
        writable: true,
        configurable: true
    })

    this.walk(value)
}

Observer.prototype.walk = function (obj){
    debugger;
    Object.keys(obj).forEach(function (key){
        debugger;
        this.convert(key, obj[key]);
    },this)
}

Observer.prototype.convert = function (key , value){
    debugger;
    defineReactive(this.value, key, value)
}

Observer.prototype.addVm = function (vm) {
    debugger;
    (this.vms || (this.vms = [])).push(vm)
}

function defineReactive(obj, key, value){
    debugger;
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get : function reactiveGetter(){
            debugger;
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            debugger;
            if (value === newVal) {
                return
            } else {
                value = newVal
                dep.notify()
            }
        }
    })
}