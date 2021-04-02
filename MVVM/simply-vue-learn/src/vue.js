/**
 * Created by chenxingyu on 2016/11/25.
 */
var _compile = require('./compile')
var compileRoot = _compile.compileRoot
var compile = _compile.compile
var observe = require('./observe')
var Directive = require('./directive')

// import Directive from './directive';

window.Vue = Vue

function Vue(options) {
    this._init(options)
}

//初始化
Vue.prototype._init = function (options){
    this.$options = options
    this._directives = []
    this._watchers = []
    this._isVue = true

    this._initState()
    this.$mount(options.el)
}

Vue.prototype._initState = function (){
    this._initProp();
    this._initData();
}

Vue.prototype._initProp = function (){
    var options = this.$options
    options.el = document.querySelector(options.el)
}

Vue.prototype._initData = function (){
    debugger;
    var data = this._data = this.$options.data || {}
    Object.keys(this._data).forEach(function (key){
        this._proxy(key)
    }, this);

    observe(data, this)
}

//在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
Vue.prototype._proxy = function (key){
    var self = this
    Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter(){
            return self._data[key]
        },
        set: function proxySetter(val){
            self._data[key] = val;
        }
    })
}

Vue.prototype.$mount = function (el){
    this._compile(el)
}

Vue.prototype._compile = function (el){
    var original = el
    compileRoot(el)(this, el)
    compile(el)(this, el)
}

Vue.prototype._bindDir = function (descriptor, node){
    debugger;
    //实力化 Directive
    this._directives.push(new Directive(descriptor, this, node))
}