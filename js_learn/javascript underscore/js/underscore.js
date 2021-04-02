/**
 * Created by mac on 16/6/22.
 */
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

    // 基线设置
    // --------------

    
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
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    //所有**的ECMAScript5 **本机的功能实现，我们希望用
    //在这里声明。
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

    // 代孕原型交换的裸体函数引用。
    var Ctor = function(){};

    // 创造一个安全的参考下划线对象供下面使用。
    var _ = function(obj) {
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
        root._ = _;
    }

    // 当前版本
    _.VERSION = '1.8.3';

    //内部函数返回一个有效的（当前引擎）版本
    //传入的回调，在其他下划线重复应用
    // 函数。
    var optimizeCb = function(func, context, argCount) {
        
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            // 2参数的情况下被忽略了，只是因为目前没有消费者
            //利用它。
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    var builtinIteratee;

    //内部函数来产生可应用于每个回调
    //元素集合中，返回预期的结果 - 要么`identity`，
    //任意回调，属性匹配，或属性访问器。
    var cb = function(value, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };

    //我们的回调产生的外部包装。用户可以自定义
    //`_.iteratee`如果他们想要更多的谓词/ iteratee速记风格。
    //这个抽象隐藏了内部专用argCount说法。
    _.iteratee = builtinIteratee = function(value, context) {
        return cb(value, context, Infinity);
    };

    //类似ES6的其余参数（http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html）
    //这个累积传递到一个数组，给定索引后的参数。
    var restArgs = function(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
                case 2: return func.call(this, arguments[0], arguments[1], rest);
            }
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
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };

    //属性
    var property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    //帮手收集方法，以确定是否一个集合
    //应迭代作为数组或作为对象。
    //相关：http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    //避免了对ARM-64很讨厌的iOS 8 JIT错误。 ＃2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function(collection) {

        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // 采集函数 ， 汇集,函数
    // --------------------

    //基石，一个'each`实现，又名`forEach`。
    //手柄除了阵列喜欢原始的对象。对待所有
    //稀疏阵列的喜欢，好像他们是密集。
    _.each = _.forEach = function(obj, iteratee, context) {
        
        iteratee = optimizeCb(iteratee, context);
        var i, length;

        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };

    //返回施加iteratee到每个元素的结果。
    _.map = _.collect = function(obj, iteratee, context) {
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
    var createReduce = function(dir) {
        //裹代码重新分配一个单独的函数比参数变量
        //访问`arguments.length`避免PERF命中之一。 （＃1991）
        var reducer = function(obj, iteratee, memo, initial) {
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

        return function(obj, iteratee, memo, context) {
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
    _.find = _.detect = function(obj, predicate, context) {
        var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
        var key = keyFinder(obj, predicate, context);
        if (key !== void 0 && key !== -1) return obj[key];
    };

    //返回所有通过一个道理测试的元素。
    //别名为`select`。
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    //返回所有这些真理测试失败的元素。
    _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };

    //确定是否所有的元素匹配真理的测试。
    //别名为`all`。
    _.every = _.all = function(obj, predicate, context) {
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
    _.some = _.any = function(obj, predicate, context) {
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
    _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    };

    //集合中调用每个项目的方法（带参数）。
    _.invoke = restArgs(function(obj, method, args) {
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    });

    //`map`常见的用例的便利版本：获取一个属性。
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };

    // filter`的`常见的用例的便利版本：只选择对象
    //包含特定`key：value`对。
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };

    // find`的`常见的用例的便利版本：获得的第一个对象
    //包含特定`键：value`对。
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };

    //返回的最大元素（或元素为基础计算）。
    _.max = function(obj, iteratee, context) {
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
            _.each(obj, function(v, index, list) {
                computed = iteratee(v, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = v;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    //返回最小元素（或元素为基础计算）。
    _.min = function(obj, iteratee, context) {
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
            _.each(obj, function(v, index, list) {
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
    _.shuffle = function(obj) {
        return _.sample(obj, Infinity);
    };
    //样品** N**使用的现代版从集合随机值
    // [费雪耶茨洗牌（http://en.wikipedia.org/wiki/Fisher-Yates_shuffle）。
    //如果** N**未指定，返回一个随机元素。
    //内部`guard`参数允许它与`map`工作。
    _.sample = function(obj, n, guard) {
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
    _.sortBy = function(obj, iteratee, context) {
        var index = 0;
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function(value, key, list) {
            return {
                value: value,
                index: index++,
                criteria: iteratee(value, key, list)
            };
        }).sort(function(left, right) {
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
    var group = function(behavior, partition) {
        return function(obj, iteratee, context) {
            var result = partition ? [[], []] : {};
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };

    //通过一个标准组对象的值。通过一个字符串属性
    //通过组，或返回的标准功能。
    _.groupBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    });

    //通过一个标准索引对象的值，类似于'groupBy`，但对于
    //当你知道你的索引值将是独一无二的。
    _.indexBy = group(function(result, value, key) {
        result[key] = value;
    });

    //通过一定的标准计数的对象该组的实例。 通过
    //一个字符串属性被计数，或返回的功能
    //标准。
    _.countBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key]++; else result[key] = 1;
    });

    //字符串符号
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    //安全地创建从任何一个可迭代活生生的数组。
    _.toArray = function(obj) {
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
    _.size = function(obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };

    //拆分成集两个数组：一是所有元素均满足给定
    //断言，一个所有元素均不能满足谓语。
    _.partition = group(function(result, value, pass) {
        result[pass ? 0 : 1].push(value);
    }, true);

    // 阵列函数
    // ---------------

    //获取的阵列的第一个元素。传递** N**将返回前N
    //阵列中//值。别名为`head`和`take`。 **的**守卫检查
    //允许它可以用`_.map`工作。
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null || array.length < 1) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };

    //返回的一切，但该数组的最后一项。特别是在有用
    // arguments对象。传递** N**将返回所有的值
    //数组，但不包括最后N。
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };

    //获取数组的最后一个元素。传递** N**将返回最后N
    // 阵列中值。
    _.last = function(array, n, guard) {
        if (array == null || array.length < 1) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };

    //返回的一切，但该数组的第一个条目。别名为`tail`和`drop`。
    //特别有用的参数对象。传递一个** N**将返回
    //剩下的N个值的数组中为止。
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    //从一个数组修剪掉所有falsy值。
    _.compact = function(array) {
        return _.filter(array, Boolean);
    };

    //内部执行递归`flatten`。
    var flatten = function(input, shallow, strict, output) {
        output = output || [];
        var idx = output.length;
        for (var i = 0, length = getLength(input); i < length; i++) {
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
    };


    //扁平化阵列，无论是递归（默认），或者只是一个级别。
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, false);
    };

    //返回一个版本不包含指定值（S）的数组。
    _.without = restArgs(function(array, otherArrays) {
        return _.difference(array, otherArrays);
    });

    //产生阵列的无重复的版本。如果该数组有已经
    //被排序，你必须使用更快的算法的选择。
    //别名为`unique`。
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i++) {
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
    _.union = restArgs(function(arrays) {
        return _.uniq(flatten(arrays, true, true));
    });

    //生成包含所有共享的每个项目的数组
    //传入数组。
    _.intersection = function(array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            var j;
            for (j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) break;
            }
            if (j === argsLength) result.push(item);
        }
        return result;
    };

    //以一个阵列和其他一些阵列之间的差异。
    //只存在只是第一阵列将保留在元素。
    _.difference = restArgs(function(array, rest) {
        rest = flatten(rest, true, true);
        return _.filter(array, function(value){
            return !_.contains(rest, value);
        });
    });

    // _.zip的补码。解压接受阵列和组的阵列
    //每个阵列的共享指数的元素。
    _.unzip = function(array) {
        var length = array && _.max(array, getLength).length || 0;
        var result = Array(length);

        for (var index = 0; index < length; index++) {
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
    _.object = function(list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    //生成函数创建的findIndex和findLastIndex功能。
    var createPredicateIndexFinder = function(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
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
    _.sortedIndex = function(array, obj, iteratee, context) {
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
    var createIndexFinder = function(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
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
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if (!step) {
            step = stop < start ? -1 : 1;
        }

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    //拆分** 数组 **到含有** 计数 **或更少的元件数阵列
    //初始阵。
    _.chunk = function(array, count) {
        if (count == null || count < 1) return [];

        var result = [];
        var i = 0, length = array.length;
        while (i < length) {
            result.push(slice.call(array, i, i += count));
        }
        return result;
    };

    // 函数（啊哈）函数
    // ------------------

    //决定是否执行一个函数作为构造
    //或与所提供的参数的正常功能。
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
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
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var bound = restArgs(function(callArgs) {
            return executeBound(func, bound, context, this, args.concat(callArgs));
        });
        return bound;
    });



    //部分通过创建已取得了一些的一个版本应用函数将其
    //参数预填充，在不改变其动态`this`上下文。 _行为
    //作为默认的占位符，从而允许的参数的任何组合是
    //预填充。设置`_.partial.placeholder`自定义占位符参数。
    _.partial = restArgs(function(func, boundArgs) {
        var placeholder = _.partial.placeholder;
        var bound = function() {
            var position = 0, length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
                args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        };
        return bound;
    });

    _.partial.placeholder = _;

    //绑定一些对象的方法，以该对象。剩余的参数
    //要绑定的方法名。有用确保所有回调
    //对象上定义属于它。
    _.bindAll = restArgs(function(obj, keys) {
        keys = flatten(keys, false, false);
        var index = keys.length;
        if (index < 1) throw new Error('bindAll must be passed function names');
        while (index--) {
            var key = keys[index];
            obj[key] = _.bind(obj[key], obj);
        }
    });

    //通过存储它的结果memoize的一个昂贵的功能。
    _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };

    //延迟的功能毫秒的给定数量，然后调用
    //与提供的参数它。
    _.delay = restArgs(function(func, wait, args) {
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    });

    //推迟功能，其调度运行当前调用堆栈有后
    //清除。
    _.defer = _.partial(_.delay, _, 1);

    //返回一个函数，即调用时，将只最多触发一次
    //给定的时间窗口内。正常情况下，节流功能将运行
    //尽可能就可以了，没有以往任何时候都超过每`wait`期限一次;
    //但是如果你想禁用前沿的执行，通
    //`{leading: false}`。要禁用后缘，同上执行。
    _.throttle = function(func, wait, options) {
        var timeout, context, args, result;
        var previous = 0;
        if (!options) options = {};

        var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };

        var throttled = function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    };


    //返回一个功能，即，只要它继续被调用，不会
    //被触发。它不再是呼吁后，功能将被称为
    // n毫秒。如果`immediate`通过，触发的功能
    //领导，而不是后缘。
    _.debounce = function(func, wait, immediate) {
        var timeout, result;

        var later = function(context, args) {
            timeout = null;
            if (args) result = func.apply(context, args);
        };

        var debounced = restArgs(function(args) {
            if (timeout) clearTimeout(timeout);
            if (immediate) {
                var callNow = !timeout;
                timeout = setTimeout(later, wait);
                if (callNow) result = func.apply(this, args);
            } else {
                timeout = _.delay(later, wait, this, args);
            }

            return result;
        });

        debounced.cancel = function() {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    };

    //返回作为参数传递的第一个功能，第二，
    //方便您调节参数，前后运行代码，
    //有条件地执行原有的功能。
    _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
    };

    //返回传入的谓词的否定版本。
    _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this, arguments);
        };
    };

    //返回一个函数，函数列表的组成，每
    //消耗下面的函数的返回值。
    _.compose = function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        };
    };

    //返回将只对和第N个呼叫后执行的功能。
    _.after = function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };


    //返回将只执行到（但不包括）第N呼叫的功能。
    _.before = function(times, func) {
        var memo;
        return function() {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if (times <= 1) func = null;
            return memo;
        };
    };

    //返回将至多一个时间执行的功能，无论怎样
    //往往你怎么称呼它。有用的延迟初始化。
    _.once = _.partial(_.before, 2);

    _.restArgs = restArgs;

    // 对象函数
    // ----------------

    //在IE <9键不被`在...`迭代关键，因此错过了。
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    var collectNonEnumProps = function(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

        // Constructor is a special case.
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    };

    //获取对象的自身属性的名称。
    //为代表的 ** ECMAScript5 **的本土`Object.keys`。
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };


    //获取对象的所有属性名。
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    //获得一个对象的属性值。
    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    //返回施加iteratee到对象的各要素的结果。
    //相反，_.map它返回一个对象。
    _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {};
        for (var index = 0; index < length; index++) {
            var currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    //转换对象到`[键，值]`对的列表。
    _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };


    //反转对象的键和值。该值必须是可序列化。
    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    //返回该对象上可用的功能名称的排序的列表。
    //别名为`methods`。
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    //创建分配器功能的内部函数。
    var createAssigner = function(keysFunc, defaults) {
        return function(obj) {
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
    _.extend = createAssigner(_.allKeys);

    //分配与传入的对象（S）所有自己的属性给定的对象。
    //（https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign）
    _.extendOwn = _.assign = createAssigner(_.keys);

    //返回传递一个谓词测试对象上的第一个键。
    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj), key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };

    //内部挑选助手功能，以确定是否`obj`具有关键`key`。
    var keyInObj = function(value, key, obj) {
        return key in obj;
    };

    //返回只包含白名单属性对象的副本。
    _.pick = restArgs(function(obj, keys) {
        var result = {}, iteratee = keys[0];
        if (obj == null) return result;
        if (_.isFunction(iteratee)) {
            if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
            keys = _.allKeys(obj);
        } else {
            iteratee = keyInObj;
            keys = flatten(keys, false, false);
            obj = Object(obj);
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) result[key] = value;
        }
        return result;
    });

    //返回对象的副本没有列入黑名单的属性。
    _.omit = restArgs(function(obj, keys) {
        var iteratee = keys[0], context;
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
            if (keys.length > 1) context = keys[1];
        } else {
            keys = _.map(flatten(keys, false, false), String);
            iteratee = function(value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    });

    //在默认属性给定对象填写。
    _.defaults = createAssigner(_.allKeys, true);

    //创建从给定的原型对象继承的对象。
    //如果提供附加的特性，然后，他们将被添加到
    //创建的对象。
    _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
    };

    //创建一个（浅克隆）对象的复制。
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    //调用拦截与obj，然后返回物镜。
    //此方法的主要目的是“进军”的方法连锁，
    //为了在链中的中间结果执行操作。
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };

    //返回一个对象是否具有给定`key：value`对。
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };


    //为`isEqual`内部递归比较函数。
    var eq, deepEq;
    eq = function(a, b, aStack, bStack) {
        //相同对象是相等的。 `0 === -0`，但它们是不相同的。
        //参见[`和谐提案egal`（http://wiki.ecmascript.org/doku.php?id=harmony:egal）.
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        //严格​​的比较是必要的，因为'null== undefined`。
        if (a == null || b == null) return a === b;
        //`NaN`s相当，但不返的。
        if (a !== a) return b !== b;
        //排出原始校验
        var type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
        return deepEq(a, b, aStack, bStack);
    };


    //为`isEqual`内部递归比较函数。
    deepEq = function(a, b, aStack, bStack) {
        //解开缠的任何物体。
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        //比较`[类]`名。
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {

            //字符串，数字，正则表达式，日期和布尔值按值进行比较。
            case '[object RegExp]':
            //正则表达式被强制为字符串比较（注：''+ / A / I ==='/ A / I'）
            case '[object String]':
                //原语和它们对应的对象包装是等价的;因此，`“5”是`
                //等同于'新的String（“5”）`
                return '' + a === '' + b;
            case '[object Number]':
                //`NaN`s相当，但不返的。
                //对象（NAN）等同为NaN。
                if (+a !== +a) return +b !== +b;
                //一个`egal`比较其他数值进行。
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                //强制转换日期和布尔值到数字的原始值。日期由他们的比较
                //毫秒表示。注意用毫秒表示的无效日期
                // NaN`的`是不等价的。
                return +a === +b;
            case '[object Symbol]':
                return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        }

        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object') return false;

            //使用不同的构造函数的对象是不等价的，但是`Object`s或`Array`s
            //来自不同框架。
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                _.isFunction(bCtor) && bCtor instanceof bCtor)
                && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        //承担环状结构平等。该算法用于检测循环
        //结构是由ES 5.1改编节15.12.3，抽象操作`JO`。

        //初始化走过的对象堆栈。
        //它在这里做，因为我们只需要他们的对象和数组比较。
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            //线性搜索。性能是成反比的数目
            //独特的嵌套结构。
            if (aStack[length] === a) return bStack[length] === b;
        }


        //第一对象添加到遍历对象的堆栈。
        aStack.push(a);
        bStack.push(b);

        //递归的比较对象和数组。
        if (areArrays) {
            //比较阵列的长度，以确定是否一个深的比较是必要的。
            length = a.length;
            if (length !== b.length) return false;
            //比较深的内容，而忽略非数字属性。
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            //深比较对象。
            var keys = _.keys(a), key;
            length = keys.length;
            //确保两个对象包含深比较面前人人平等相同数量的属性。
            if (_.keys(b).length !== length) return false;
            while (length--) {
                //深比较的每个成员
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        //来自遍历对象堆栈中取出的第一个对象。
        aStack.pop();
        bStack.pop();
        return true;
    };

    //执行一个深比较刻检查，如果两个对象是相等的。
    _.isEqual = function(a, b) {
        return eq(a, b);
    };


    //是一个给定的数组，字符串或对象是空的？
    //一个“空”对象没有枚举自己的属性。
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };

    //是一个给定值的DOM元素？
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };

    //是一个给定值的数组？
    //代表们ECMA5本土Array.isArray
    _.isArray = nativeIsArray || function(obj) {
            return toString.call(obj) === '[object Array]';
        };

    //是一个给定变量的对象？
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    //添加一些isType方法：isArguments，isFunction，isString，ISNUMBER，而isDate，isRegExp，ISERROR，ISMAP，isWeakMap，使用isset，isWeakSet。
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
        
        _['is' + name] = function(obj) {
            
            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    //在浏览器中定义方法的备用版本（啊哈，IE <9），其中
    //没有任何视察“参数”类型。
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return _.has(obj, 'callee');
        };
    }

    //优化`isFunction`如果合适的话。老V8解决一些typeof运算错误，
    // IE 11（＃1621），Safari浏览器8（＃1929），和PhantomJS（＃2236）。
    var nodelist = root.document && root.document.childNodes;
    if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }

    //是一个给定对象的数量有限？
    _.isFinite = function(obj) {
        return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
    };

    //是给定的值`NaN`？
    _.isNaN = function(obj) {
        return _.isNumber(obj) && isNaN(obj);
    };

    //是一个给定值的布尔？
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    //是一个给定值等于空？
    _.isNull = function(obj) {
        return obj === null;
    };

    //是一个给定的变量未定义？
    _.isUndefined = function(obj) {
        return obj === void 0;
    };

    //快捷功能检查，如果一个物体具有直接给定属性
    //自身（换言之，不上的原型）。
    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    // 效用函数
    // -----------------

    //运行Underscore.js在* noConflict *模式，返回`_`变量的
    //以前的主人。返回下划线对象的引用。
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };

    //保留身份四处功能默认iteratees。
    _.identity = function(value) {
        return value;
    };

    //谓词生成功能。往往是有用的下划线之外。
    _.constant = function(value) {
        return function() {
            return value;
        };
    };

    _.noop = function(){};

    _.property = property;

    //生成给定对象，返回一个给定属性的功能。
    _.propertyOf = function(obj) {
        return obj == null ? function(){} : function(key) {
            return obj[key];
        };
    };

    //返回谓词用于检查对象是否具有给定的
    //`key：value`对。
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    };

    //运行功能** N **次。
    _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };

    //返回min和max（含）之间的随机整数。
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A（可能更快）的方式来获得当前的时间戳作为一个整数。
    _.now = Date.now || function() {
            return new Date().getTime();
        };

    // HTML实体转义列表。
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);

    //功能从HTML插值逃逸，非转义字符串/。
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };

        //正则表达式识别需要进行转义的关键。
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);

    //如果命名`property`的值是一个函数，则与调用它
    //`object`为背景;否则，返回它。
    _.result = function(object, prop, fallback) {
        var value = object == null ? void 0 : object[prop];
        if (value === void 0) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
    };

    //生成一个唯一的整数ID（在整个客户端会话中是唯一的）。
    //有用的临时DOM的ID。
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    //默认情况下，下划线使用ERB风格的模板分隔符，改
    //下面的模板设置，使用替代分隔符。
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    //在定制`templateSettings`，如果你不想定义
    //插值，评估或逃避正则表达式，我们需要一个是
    //保证不匹配。
    var noMatch = /(.)^/;

    //某些字符需要进行转义，以便他们可以被放入一个
    //字符串。
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

    var escapeChar = function(match) {
        return '\\' + escapes[match];
    };

    // JavaScript的微模板，类似于约翰Resig的实现。
    //下划线的模板处理任意分隔符，保留空白，
    //正确插值逃逸代码中的引号。
    //注意：`oldSettings`只存在向后兼容性。
    _.template = function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);


        //通过交替结合的分隔符为一个正则表达式。
        var matcher = RegExp([
                (settings.escape || noMatch).source,
                (settings.interpolate || noMatch).source,
                (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');

        //编译模板源，适当转义字符串。
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }

            //的Adobe的虚拟机所需要的匹配返回产生正确的偏移量。
            return match;
        });
        source += "';\n";

        //如果没有指定一个变量，在局部范围内发生的数据值。
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

        var render;
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function(data) {
            return render.call(this, data, _);
        };

        //提供的源代码编译为一个预编译的方便。
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    };

    //添加一个“链”函数。启动一个链接下划线包裹对象。
    _.chain = function(obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    // OOP
    // ---------------
    //如果下划线作为函数调用，它返回一个包装对象，
    //可以用OO风格。此包装持有的所有版本的改变
    //下划线功能。包装的对象可以链接。


    //辅助函数继续链中间结果。
    var chainResult = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };

    //添加自己的自定义功能，以下划线对象。
    _.mixin = function(obj) {
        
        _.each(_.functions(obj), function(name) {
            
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return chainResult(this, func.apply(_, args));
            };
        });
        return _;
    };

    //所有的下划线功能添加到包装对象。
    _.mixin(_);

    //将所有突变阵列功能的包装。
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return chainResult(this, obj);
        };
    });

    //将所有访问阵列功能的包装。
    _.each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return chainResult(this, method.apply(this._wrapped, arguments));
        };
    });


    //提取从包装和链接对象的结果。
    _.prototype.value = function() {
        return this._wrapped;
    };

    //提供代理展开在发动机操作中使用的一些方法
    //如算术和JSON字串化。
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

    _.prototype.toString = function() {
        return String(this._wrapped);
    };

    // AMD登记发生在结束与AMD装载机的兼容性
    //可能不会强制执行模块下转语义。尽管一般
    //实践AMD登记是匿名的，下划线寄存器
    //为命名的模块，因为，像jQuery，它是一个基础库，
    //人气很足，在第三方的lib被捆绑，但不能成为其中的一部分
    // AMD的负载要求。这些案件可能会产生错误的时
    //匿名定义（）称为加载请求之外。
    if (typeof define == 'function' && define.amd) {
        define('underscore', [], function() {
            return _;
        });
    }
}());