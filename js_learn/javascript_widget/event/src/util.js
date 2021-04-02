/**
 * Created by chenxingyu on 2016/12/29.
 */

var util = {};
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var emptyArray = [];
var concat = emptyArray.concat;
var filter = emptyArray.filter;
var slice = emptyArray.slice;

//判断是否是数组 , 排除类数组
function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length;
    var type = util.type(obj);

    return 'function' != type && !isWindow(obj) && (
            'array' == type || length === 0 ||
            (typeof length == 'number' && length > 0 && (length - 1) in obj)
        );
}

//判断是否是window
function isWindow(obj) {
    return obj != null && obj == obj.window;
}

// 返回对象的类型
util.type = function (obj) {
    var type;
    if (obj == null) {
        type = String(obj);
    } else {
        type = toString.call(obj).toLowerCase();
        type = type.substring(8, type.length - 1);
    }
    return type || "object";
};

//判断是否是函数
util.isFunction = function (value) {
    return util.type(value) == "function";
};

// 遍历数组或对象，当迭代函数返回 false 时终止
util.each = function (obj, callback, context) {
    var i;
    var len;
    var key;
    context = context || obj || null;

    if (likeArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
            if (callback.call(context, obj[i] , i, obj) === false) {
                return;
            }
        }
    } else {
        for (key in obj) {
            if (hasOwn.call(obj, key)) {
                if (callback.call(context, obj[key], key, obj) === false) {
                    return;
                }
            }
        }
    }
};

// 将方法的 this 绑定为指定的对象
util.bind = function (fn, context) {
    var args = slice.call(arguments, 2);
    return function bind() {
        fn.apply(context || null, args.concat(slice.call(arguments)));
    }
};

// 来自 jQuery
util.isPlainObject = function (obj) {
    var key;
    if (!obj || util.type(obj) !== "object" || obj.nodeType || "setInterval" in obj) {
        return false;
    }
    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
    }
    for (key in obj) {
    }
    return key === undefined || hasOwn.call(obj, key);
};


//实现多层对象拷贝
function extend(target, source, deep) {
    for (var key in source) {
        // debugger;
        //如果满足条件 ， 则执行深复制
        if (deep && (util.isPlainObject(source[key]) || isArray(source[key]))) {
            if (util.isPlainObject(source[key]) && !util.isPlainObject(target[key])) {
                target[key] = {};
            }

            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }

            //递归
            extend(target[key], source[key], deep);
        } else if ((source[key] !== undefined)) {
            target[key] = source[key];
        }
    }
}

//将所有未定义的属性从一个或多个对象复制到`target`对象。
util.extend = function (target) {
    // debugger;
    var deep;
    var args = slice.call(arguments, 1);
    if (typeof target == 'boolean') {
        deep = target;
        target = args.shift();
    }

    args.forEach(function (arg) {
        // debugger;
        extend(target, arg, deep);
    });

    return target;
};

//来自MDN
util.indexOf = function(array, searchElement, fromIndex) {
    var k;

    // 1.让o是调用ToObject传递此值作为参数的结果。
    if (array == null) {
        throw new TypeError('"array" is null or not defined');
    }

    var o = Object(array);

    // 2.让lenValue是调用参数为“length”的o的Get内部方法的结果。
    // 3.让len为ToUint32（lenValue）。
    var len = o.length >>> 0;

    // 4. 如果 len 为 0, return -1.
    if (len === 0) {
        return -1;
    }

    // 5.如果参数fromIndex被传递，让n为ToInteger（fromIndex）; 否则令n为0。
    var n = fromIndex | 0;

    // 6. 如果 n >= len, return -1.
    if (n >= len) {
        return -1;
    }

    // 7.如果n >= 0，则令k为n。
    // 8.如果n <0，令k为len - abs（n）。 如果k小于0，则令k为0。
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
        if (k in o && o[k] === searchElement) {
            return k;
        }
        k++;
    }
    return -1;
};

// util.indexOf1 = function (array, obj) {
//     for (var i = 0, len = array.length; i < len; i++) {
//         if (array[i] === obj) {
//             return i;
//         }
//     }
//     return -1;
// };

export default util;
    
