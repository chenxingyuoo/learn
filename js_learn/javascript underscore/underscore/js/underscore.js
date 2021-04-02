/**
 * Created by mac on 16/6/23.
 */
(function() {
//在浏览器中，建立了根对象，`window`（`self`）`global`
//在服务器上，或`this`在某些虚拟机。我们使用
//的`self`代替`window`为`网络Worker`支持。
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

//保存`_`变量的前值。
    var previousUnderscore = root._;

// 字节保存在缩小的（但不是gzip压缩的）版本：
    var ArrayProto = Array.prototype, ObjProto = Object.prototype;
    var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// 创建速度接入到核心的原型快速参考变量。
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        indexOf = ArrayProto.indexOf,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        trim = String.prototype.trim;

//所有**的ECMAScript5 **本机的功能实现，我们希望用
//在这里声明。
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

// 代孕原型交换的裸体函数引用。
    var Ctor = function () {
    };

// 创造一个安全的参考下划线对象供下面使用。
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };


//导出下划线对象****的Node.js，与
//为他们的旧模块API向后兼容。如果我们在
//浏览器，添加`_`作为一个全局对象。
//（`nodeType`被检查以确保`模型`
//和`exports`不是HTML元素）。
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;  //root 是 window对象
    }


//包装回调函数
//内部函数返回一个有效的（当前引擎）版本
//传入的回调，在其他下划线重复应用
// 函数。
    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            // 2参数的情况下被忽略了，只是因为目前没有消费者
            //利用它。
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };


    var builtinIteratee;
//内部函数来产生可应用于每个回调
//元素集合中，返回预期的结果 - 要么`identity`，
//任意回调，属性匹配，或属性访问器。
    var cb = function (action, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(action, context);
        if (action == null) return _.identity;
        if (_.isFunction(action)) return optimizeCb(action, context, argCount);
        if (_.isObject(action)) return _.matcher(action);
        return _.property(action);
    };

//我们的回调产生的外部包装。用户可以自定义
//`_.iteratee`如果他们想要更多的谓词/ iteratee速记风格。
//这个抽象隐藏了内部专用argCount说法。
    _.iteratee = builtinIteratee = function (value, context) {
        return cb(value, context, Infinity);
    };


//类似ES6的其余参数（http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html）
//这个累积传递到一个数组，给定索引后的参数。
    var restArgs = function (func, startIndex) {
        debugger
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function () {
            debugger
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0:
                    return func.call(this, rest);
                case 1:
                    return func.call(this, arguments[0], rest);
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest);
            }

            //startIndex > 2 的时候执行下面
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        };
    };


    //创建一个新对象，从另一个继承的内部函数。 Ctor 是裸函数
    var baseCreate = function(prototype) {
        debugger
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };


//属性
    var property = function (key) {
        debugger
        return function (obj) {
            debugger
            return obj == null ? void 0 : obj[key];
        };
    };

//帮手收集方法，以确定是否一个集合
//应迭代作为数组或作为对象。
//相关：http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
//避免了对ARM-64很讨厌的iOS 8 JIT错误。 ＃2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    //判断一个对象是否是数组 ， 类数组
    var isArrayLike = function (collection) {
        var length = getLength(collection); // 上面property 传的参数是 length ， 执行 property 返回的闭包 。传一个数组 ， 就返回一个length值
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };


// 采集函数 ， 汇集,函数
// --------------------

//基石，一个'each`实现，又名`forEach`。
//手柄除了阵列喜欢原始的对象。对待所有
//稀疏阵列的喜欢，好像他们是密集。
    _.each = _.forEach = function (obj, iteratee, context) {
        //包装回调函数
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                debugger
                iteratee(obj[i], i, obj);
            }
        } else {
            //_.keys 调用了 Object.keys 。方法 ，读取自身的属性名 ， 返回自身的属性名数组 。 ECMAScript5的东西
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                debugger
                // obj[keys[i]] 得知自身属性名就可以从传进来的对象上获取对应的值
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }

        return obj;
    };

    _.map = _.collect = function (obj, iteratee, context) {
        debugger
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

//创建迭代向左或向右还原功能。
    var createReduce = function (dir) {
        //裹代码重新分配一个单独的函数比参数变量
        //访问`arguments.length`避免PERF命中之一。 （＃1991）
        var reducer = function (obj, iteratee, memo, initial) {
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            if (!initial) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        };

        return function (obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
        };
    };

//**减少**从值的列表构建了一个结果，又名`inject`，
//或`foldl`。
    _.reduce = _.foldl = _.inject = createReduce(1);

//减少，也被称为'foldr`的右结合的版本。
    _.reduceRight = _.foldr = createReduce(-1);

//返回它通过一个道理测试的第一个值。别名为`detect`。
    _.find = _.detect = function (obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) return obj[key];
    };


//返回所有通过一个道理测试的元素。
//别名为`select`。
    _.filter = _.select = function (obj, predicate, context) {
        var result = [];
        predicate = cb(predicate, context);
        _.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) result.push(value);
        });
        return result;
    };

// filter`的`常见的用例的便利版本：只选择对象   //返回值正确 ？
//包含特定`key：value`对。
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

// find`的`常见的用例的便利版本：获得的第一个对象  //返回值正确 ？
//包含特定`键：value`对。
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };


//返回所有这些真理测试失败的元素。
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate), context));
    };

//确定是否所有的元素匹配真理的测试。
//别名为`all`。
    _.every = _.all = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

//确定是否在对象的至少一种元素的真理测试赛。
//别名为`any`。
    _.some = _.any = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }

        return false;
    };

//确定是否数组或对象包含一个给定的项目（使用``===）。
//别名为`includes`和`include`。
//如果list包含指定的value则返回true（使用===检测）。如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
        debugger
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    };


//集合中调用每个项目的方法（带参数）。
    _.invoke = restArgs(function (obj, method, args) {
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    });


//`map`常见的用例的便利版本：获取一个属性。
    _.pluck = function (obj, key) {
        debugger
        return _.map(obj, _.property(key));
    };


// //返回的最大元素（或元素为基础计算）。
    _.max = function (obj, iteratee, context) {
        debugger
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value != null && value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (v, index, list) {
                debugger
                computed = iteratee(v, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = v;
                    lastComputed = computed;
                }
            });

        }
        return result;
    };

////返回最小元素（或元素为基础计算）。
    _.min = function (obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value != null && value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (v, index, list) {
                computed = iteratee(v, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = v;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };


//洗牌 ， 改组 的集合。
    _.shuffle = function (obj) {
        return _.sample(obj, Infinity);
    };

//样品** N**使用的现代版从集合随机值
// [费雪耶茨洗牌（http://en.wikipedia.org/wiki/Fisher-Yates_shuffle）。
//如果** N**未指定，返回一个随机元素。
//内部`guard`参数允许它与`map`工作。
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
        var length = getLength(sample);
        n = Math.max(Math.min(n, length), 0);
        var last = length - 1;
        for (var index = 0; index < n; index++) {
            var rand = _.random(index, last);
            var temp = sample[index];
            sample[index] = sample[rand];
            sample[rand] = temp;
        }
        return sample.slice(0, n);
    };


//通过由iteratee生产的标准排序对象的值。
    _.sortBy = function (obj, iteratee, context) {
        var index = 0;
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function (value, key, list) {
            return {
                value: value,
                index: index++,
                criteria: iteratee(value, key, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };


//“分组依据”操作用于聚合的内部函数。
    var group = function (behavior, partition) {

        return function (obj, iteratee, context) {
            var result = partition ? [[], []] : {};
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

//通过一个标准组对象的值。通过一个字符串属性
//通过组，或返回的标准功能。
    _.groupBy = group(function (result, value, key) {
        //没有自有属性就添加
        //有自有属性就push 进去
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    });

//通过一个标准索引对象的值，类似于'groupBy`，但对于
//当你知道你的索引值将是独一无二的。
    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });

//通过一定的标准计数的对象该组的实例。 通过
//一个字符串属性被计数，或返回的功能
//标准。
    _.countBy = group(function (result, value, key) {
        //没有自有属性就添加 ， result[key] = 1 计算的初始值为1
        //有自有属性就 ++
        if (_.has(result, key)) result[key]++; else result[key] = 1;
    });

//字符串符号
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
//安全地创建从任何一个可迭代活生生的数组。
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (_.isString(obj)) {
            //保留代理对字符一起
            return obj.match(reStrSymbol);
        }
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
    };

//返回一个对象的元素的数量。
    _.size = function (obj) {
        if (obj == null) return false;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };

//拆分成集两个数组：一是所有元素均满足给定
//断言，一个所有元素均不能满足谓语。
    _.partition = group(function (result, value, pass) {
        result[pass ? 0 : 1].push(value);
    }, true);


//生成函数创建的findIndex和findLastIndex功能。
    var createPredicateIndexFinder = function (dir) {
        return function (array, predicate, context) {
            debugger
            predicate = cb(predicate, context);
            var length = getLength(array);
            //通过 dir 参数 ， 是应该从数组的前面 ， 或者 末尾 开始遍历
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                //执行回调函数 ， 如果回调函数设置了return， 马上返回 ， 不会遍历整个list ， 否则就会遍历整个list
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    };

//返回一个数组，这样传递一个谓词测试的第一个指标。
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);


//使用比较功能找出最小的指数在该
//对象应该被插入，以维持秩序。使用二进制搜索。
    _.sortedIndex = function (array, obj, iteratee, context) {
        debugger
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
        }
        return low;
    };

//生成函数创建的indexOf和lastIndexOf功能。
    var createIndexFinder = function (dir, predicateFind, sortedIndex) {
        debugger
        return function (array, item, idx) {
            debugger
            var i = 0, length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };
    };

//返回数组中项的第一次出现的位置，
//或-1，如果该项目不包括在数组中为止。
//如果数组很大，已经在排序顺序，通过TRUE;
//为**  isSorted ** 使用二进制搜索。
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);



    //生成包含算术级数的整型数组。港
    //本机的Python`range（）`函数。看到
    // [Python文档]（http://docs.python.org/library/functions.html#range）。
    _.range = function(start, stop, step) {
        debugger
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if(!step){
            step = stop < start ? -1 : 1;
        }
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }
        return range;
    };


//数组函数
// ----------------


//获取的阵列的第一个元素。传递** N**将返回前N
//阵列中//值。别名为`head`和`take`。 **的**守卫检查
//允许它可以用`_.map`工作。
    _.first = _.head = _.take = function (array, n, guard) {

        if (array == null || array.length < 1) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };


//返回的一切，但该数组的最后一项。特别是在有用
// arguments对象。传递** N**将返回所有的值
//数组，但不包括最后N。
    _.initial = function (array, n, guard) {

        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

//获取数组的最后一个元素。传递** N**将返回最后N
// 阵列中值。
    _.last = function (array, n, guard) {
        if (array == null || array.length < 1) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };

//返回的一切，但该数组的第一个条目。别名为`tail`和`drop`。
//特别有用的参数对象。传递一个** N**将返回
//剩下的N个值的数组中为止。
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

//从一个数组修剪掉所有falsy值。
    _.compact = function (array) {
        return _.filter(array, Boolean);
    };

//内部执行递归`flatten`。
    function flatten(input, shallow, strict, output) {
        output = output || [];
        debugger
        var idx = output.length;
        for (var i = 0, length = getLength(input); i < length; i++) {
            debugger
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                //拼合数组或参数对象的当前水平。
                if (shallow) {
                    var j = 0, len = value.length;
                    while (j < len) output[idx++] = value[j++];
                } else {
                    flatten(value, shallow, strict, output);
                    idx = output.length;
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    }

//扁平化阵列，无论是递归（默认），或者只是一个级别。
    _.flatten = function (array, shallow) {
        debugger
        return flatten(array, shallow, false);
    };

//返回一个版本不包含指定值（S）的数组。
    _.without = restArgs(function (array, otherArrays) {
        return _.difference(array, otherArrays);
    });


//以一个阵列和其他一些阵列之间的差异。
//只存在只是第一阵列将保留在元素。
    _.difference = restArgs(function (array, rest) {
        debugger
        rest = flatten(rest, true, true);
        return _.filter(array, function (value) {
            debugger
            return !_.contains(rest, value);
        });
    });


//产生阵列的无重复的版本。如果该数组有已经
//被排序，你必须使用更快的算法的选择。那么给 isSorted 参数传递 true值
//别名为`unique`。
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
        debugger
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i++) {
            debugger
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    };

//所有的每个不同的元素：生成一个包含联合数组
//传入数组。
    _.union = restArgs(function (arrays) {
        debugger
        return _.uniq(flatten(arrays, true, true));
    });

 //生成包含所有共享的每个项目的数组
    //传入数组。
    _.intersection = function (array) {
        debugger
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i++) {
            debugger
            var item = array[i];
            if(_.contains(result, item)) continue;
            for (var j = 1; j < argsLength; j++) {
                debugger
                if (!_.contains(arguments[j], item)) break;
            }
            if(j === argsLength) result.push(item);
        }
        return result;
    };


    // _.zip的补码。解压接受阵列和组的阵列
    //每个阵列的共享指数的元素。
    _.unzip = function(array) {
        debugger
        //取出最大长度数组的length值
        var length = array && _.max(array, getLength).length || 0;
        var result = Array(length);

        //循环
        for (var index = 0; index < length; index++) {
            debugger
            result[index] = _.pluck(array, index);
        }
        return result;
    };

    //邮编在一起多个列表成一个单一的阵列 - 共享的元素
    //指数一起去。
    _.zip = restArgs(_.unzip);


    //转换列表转换对象。通过其中的`[键，值]一个阵列`
    //对，或具有相同长度的两个平行的阵列 - 键之一，和一
    //相应的值。
    _.object = function (list, values) {
        debugger
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
            debugger
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };


// 函数（啊哈）函数
// ----------------
    //决定是否执行一个函数作为构造
    //或与所提供的参数的正常功能。
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        debugger
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
    };

    //创建绑定到给定对象的功能（分配`this`和参数，
    //可选）。代表们**的ECMAScript 5 **的本土`Function.bind`如果
    //可用。
    _.bind = restArgs(function(func, context, args) {
        debugger
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var bound = restArgs(function(callArgs) {
            debugger
            return executeBound(func, bound, context, this, args.concat(callArgs));
        });
        return bound;
    });


// 对象函数
// ----------------

    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
    };


//返回一个对象是否具有给定`key：value`对。
    _.isMatch = function (object, attrs) {
        debugger
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };


//创建分配器功能的内部函数。
    var createAssigner = function (keysFunc, defaults) {
        return function (obj) {

            var length = arguments.length;
            if (defaults) obj = Object(obj);
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!defaults || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };

//扩展一个给定的对象，所有传入的对象（S）的属性。
//_.extend = createAssigner(_.allKeys);

//分配与传入的对象（S）所有自己的属性给定的对象。
//（https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign）
    _.extendOwn = _.assign = createAssigner(_.keys);


//返回传递一个谓词测试对象上的第一个键。
    _.findKey = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };


//是一个给定的数组，字符串或对象是空的？
//一个“空”对象没有枚举自己的属性。
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };


//是一个给定值的DOM元素？
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };


//是一个给定值的数组？
//代表们ECMA5本土Array.isArray
    _.isArray = nativeIsArray || function (obj) {
            return toString.call(obj) === '[object Array]';
        };


//是一个给定变量的对象？
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };


//添加一些isType方法：isArguments，isFunction，isString，ISNUMBER，而isDate，isRegExp，ISERROR，ISMAP，isWeakMap，使用isset，isWeakSet。
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });


//在浏览器中定义方法的备用版本（啊哈，IE <9），其中
//没有任何视察“参数”类型。
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return _.has(obj, 'callee');
        };
    }

//优化`isFunction`如果合适的话。老V8解决一些typeof运算错误，
// IE 11（＃1621），Safari浏览器8（＃1929），和PhantomJS（＃2236）。
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
        _.isFunction = function (obj) {
            return typeof obj == 'function' || false;
        };
    }


//是一个给定对象的数量有限？
    _.isFinite = function (obj) {
        return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
    };

//是给定的值`NaN`？
    _.isNaN = function (obj) {
        return _.isNumber(obj) && isNaN(obj);
    };

//是一个给定值的布尔？
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

//是一个给定值等于空？
    _.isNull = function (obj) {
        return obj === null;
    };


//是一个给定的变量未定义？
    _.isUndefined = function (obj) {
        return obj === void 0;
    };


//保留身份四处功能默认iteratees。
    _.identity = function (value) {
        return value;
    };

//返回传入的谓词的否定版本。 取反
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };

//获得一个对象的属性值。
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

//返回谓词用于检查对象是否具有给定的
//`key：value`对。
    _.matcher = _.matches = function (attrs) {
        debugger
        attrs = _.extendOwn({}, attrs);
        return function (obj) {
            debugger
            return _.isMatch(obj, attrs);
        };
    };

//创建一个（浅克隆）对象的复制。
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

//返回min和max（含）之间的随机整数。
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    _.property = property;

//快捷功能检查，如果一个物体具有直接给定属性
//自身（换言之，不上原型）。 自身是否有这个属性
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

})();



