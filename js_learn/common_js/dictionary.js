/**
 * Created by chenxingyu on 2016/12/2.
 */

    //词典 ， 查阅此属性是否为该对象拥有；
    function Dictionary(startValues) {
        this.values = startValues || {};
    }

    //添加key / value
    Dictionary.prototype.store = function (name, value) {
        this.values[name] = value;
    };

    //查阅key
    Dictionary.prototype.lookup = function (name) {
        return this.values[name]
    };

    //是用来判断一个对象是否有你给出名称的属性或对象，检测所指定的属性是否为一个对象的一部分以及该属性是否是可枚举的
    Dictionary.prototype.contains = function (name) {
        return Object.prototype.propertyIsEnumerable.call(this.values, name)
    };

    Dictionary.prototype.each = function (action) {
        //谁调用this变量就执行该对象   ,   例： 下面实例了Directions函数 ，构造函数里面的 this.values 变量是等于传进来的所有值 ， 这里是一个对象 , 它的values值就是下面的值
        forEachIn(this.values, action);
    };

    function forEachIn(obj, action) {
        //枚举对象 ， 满足条件就执行 action 函数 ， 实参是 prototype, obj[prototype]
        for (var prototype in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prototype)) {
                action(prototype, obj[prototype]);
            }
        }
    }