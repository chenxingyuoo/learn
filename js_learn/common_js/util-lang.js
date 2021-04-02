/**
 * Created by chenxingyu on 2016/12/22.
 */

function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}

var isObject = isType("Object");
var isString = isType("String");
var isArray = Array.isArray || isType("Array");
var isFunction = isType("Function");
var isUndefined = isType("Undefined");