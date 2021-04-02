/**
 * Created by chenxingyu on 2016/11/8.
 */

    /**
     * 继承
     *
     * @param {Function} Child
     * @param {Function} Parent
     * @return {undefined}
     **/
    function inherits(Child, Parent) {
        var F = function () {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.varructor = Child;
    }

    //兼容trim函数
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        };
    }
    //清除所有空格
    String.prototype.clearS = function () {
        return this.replace(/\s+/g, '');
    };

    //定义指定正则替换字符串
    String.prototype.replaceReg = function (regExp, newStr) {
        debugger;
        return this.replace(regExp, newStr || '');
    };


    function each(arr, fn) {
        for (var i = 0, l = arr.length, t; i < l; i++) {
            t = arr[i];
            if (fn(t, i) === false)break;
        }
    }
    function pubsub() {
        var topic = {};
        // key1:key2:key3
        function on(key, fn) {
            var keys = key.split(":");
            if (keys.length != 1) {
                each(keys, function (t) {
                    on(t, fn);
                });
                return;
            }
            (topic[key] = topic[key] || []).push(fn);
        }

        function one(key, fn) {
            fn._one_ = true;
            on(key, fn);
        }

        //key1:key2:key3
        function off(key, fn) {
            var keys = key.split(":");
            if (keys.length != 1) {
                each(keys, function (t) {
                    off(t, fn);
                });
                return;
            }
            if (fn == null)topic[key] = null;
            else for (var arr = topic[key], l = arr.length - 1, t; l >= 0; l--) {
                t = arr[l];
                if (fn == t)arr.splice(l, 1);
            }
        }

        function emit(key) {
            var keys = key.split(":");
            if (keys.length != 1) {
                each(keys, function (t) {
                    emit(t);
                });
                return;
            }
            var args = [].slice.call(arguments, 0);
            if (topic[key] == null)return;
            for (var arr = topic[key], i = 0, l = arr.length, t; i < l; i++) {
                t = arr[i];
                t.apply(null, args.slice(1));
                if (t._one_) {
                    arr.splice(i, 1);
                    i--;
                    l--;
                }
            }
        }

         return {
             one: one,
             on: on,
             off: off,
             emit: emit
         }
    }


    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * 检查对象是否具有属性。
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }


    /**
     * 检查表达式是否为字面值
     *
     * @param {String} exp
     * @return {Boolean}
     */

    var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

    function isLiteral(exp) {
        return literalValueRE.test(exp);
    }

    /**
     * 检查字符串是否以 $ 或 _ 开头
     *
     * @param {String} str
     * @return {Boolean}
     */

    function isReserved(str) {
        var c = (str + '').charCodeAt(0);
        return c === 0x24 || c === 0x5F;
    }

    /**
     * 保护文本输出，确保未定义的输出空只字符串
     *
     * @param {*} value
     * @return {String}
     */

    function _toString(value) {
        return value == null ? '' : value.toString();
    }


    /**
     * 将值转换为实际呈现的字符串。
     */
    function _toStrings(val) {
        return val == null
            ? ''
            : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
    }


    /**
     * 检查并将可能的数字字符串转换为数字 ， 然后再设置回数据
     *
     * @param {*} value
     * @return {*|Number}
     */

    function toNumber(value) {
        if (typeof value !== 'string') {
            return value;
        } else {
            var parsed = Number(value);
            return isNaN(parsed) ? value : parsed;
        }
    }


    /**
     * 将输入值转换为持久性的数字,如果转换失败，返回原始字符串。
     *
     **/

    function toNumbers(val) {
        var n = parseFloat(val, 10);
        return (n || n === 0) ? n : val
    }

    /**
     * 将字符串布尔文字转换为真正的布尔值。
     *
     * @param {*} value
     * @return {*|Boolean}
     */

    function toBoolean(value) {
        return value === 'true' ? true : value === 'false' ? false : value;
    }


    /**
     * 检查值是否为原始值
     */
    function isPrimitive(value) {
        return typeof value === 'string' || typeof value === 'number'
    }


    /**
     * 从字符串中剥离引号
     *
     * @param {String} str
     * @return {String | false}
     */

    function stripQuotes(str) {
        var a = str.charCodeAt(0);
        var b = str.charCodeAt(str.length - 1);
        return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
    }

    /**
     * 骆驼化以 - 字符分隔的字符串。
     *
     * @param {String} str
     * @return {String}
     */

    var camelizeRE = /-(\w)/g;

    function camelize(str) {
        return str.replace(camelizeRE, toUpper);
    }

    function toUpper(_, c) {
        return c ? c.toUpperCase() : '';
    }



    /**
     * 骆驼化以 - 字符分隔的字符串。
     *
     * @param {String} str
     * @return {String}
     */


    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;

    function camelCase(name) {
      return name.
        replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        }).
        replace(MOZ_HACK_REGEXP, 'Moz$1');
    }


    /**
     * Hyphenate a camelCase string.
     *
     * @param {String} str
     * @return {String}
     */

    var hyphenateRE = /([^-])([A-Z])/g;

    function hyphenate(str) {
        return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
    }

    /**
     * 将连字符/下划线/斜线分隔的名称转换为骆驼类名。
     *
     * e.g. my-component => MyComponent
     *      some_else    => SomeElse
     *      some/comp    => SomeComp
     *
     * @param {String} str
     * @return {String}
     */

    var classifyRE = /(?:^|[-_\/])(\w)/g;

    function classify(str) {
        return str.replace(classifyRE, toUpper);
    }


    /**
     * 简单绑定，比原生快
     *
     * @param {Function} fn
     * @param {Object} ctx
     * @return {Function}
     **/

    function bind(fn, ctx) {
        return function (a) {
            var l = arguments.length;
            return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
        };
    }

    Function.prototype.bind = function(){ 
        var self = this, // 保存原函数
            context = [].shift.call( arguments ),
            args = [].slice.call( arguments ); 
        return function(){ // 返回一个新的函数
            // 需要绑定的 this 上下文 // 剩余的参数转成数组
            return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) ); // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
            // 并且组合两次分别传入的参数，作为新函数的参数
         } 
    };


    //通过这种方式 ， 可以将内部函数bind 到 this 上 ， 它拥有与外部函数同样的this对象
    function method(object, name) {
        return function () {
            object[name].apply(object, arguments);
        }
    }

    var x = [];
    var pushs = method(x, 'push');
    pushs('my name?');


    /**
     * 数组调用器
     *
     **/

    function arrInvoker(arr) {
        return function (ev) {
            var arguments$1 = arguments;

            var single = arguments.length === 1;
            for (var i = 0; i < arr.length; i++) {
                single ? arr[i](ev) : arr[i].apply(null, arguments$1);
            }
        }
    }

    /**
     * 函数调用器
     *
     **/

    function fnInvoker(o) {
        return function (ev) {
            var single = arguments.length === 1;
            single ? o.fn(ev) : o.fn.apply(null, arguments);
        }
    }


    /**
     * 将类数组的对象转换为数组。
     *
     * @param {Array-like} list
     * @param {Number} [start] - start index
     * @return {Array}
     */

    function toArray(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
            ret[i] = list[i + start];
        }
        return ret;
    }

    /**
     * 将属性混合到目标对象中。
     *
     * @param {Object} to
     * @param {Object} from
     */

    function extendss(to, from) {
        var keys = Object.keys(from);
        var i = keys.length;
        while (i--) {
            to[keys[i]] = from[keys[i]];
        }
        return to;
    }


    /**
     * 将属性混合到目标对象中。
     */
    function extend(to, from) {
        for (var key in from) {
            to[key] = from[key];
        }
        return to
    }

     
    /**
     * 将属性混合到目标对象中 , 进行深拷贝 , 比jquery快很多
     * 
     */  
    function deepCopy(to , from) {
        var to = to || {};
        for (var i in from) {
            if (typeof from[i] === 'object') {
                to[i] = (isArray(from[i])) ? [] : {};
                deepCopy(to[i], from[i]);
            } else {
                to[i] = from[i];
            }
        }
        return to;
    }


    Object.defineProperty

    /**
     * 一个静态方法, 传入一个对象, 返回该对象中所有的属性, 构成数组返回
     *
     * @param {Object} object
     * @return {Array}
     **/

    if(!Object.keys){
        Object.keys =  function (object) {
            var keys = [];
            for (var property in object)
                keys.push(property);     // 将每个属性压入到一个数组中
            return keys;
        }
    }

    /**
     *  一个静态方法, 传入一个对象, 返回该对象中所有属性所对应的值, 构成数组返回
     *
     * @param {Object} object
     * @return {Array}
     **/

    if(!Object.values){
        Object.values =  function (object) {
            var values = [];
            for (var property in object) values.push(object[property]); // 将每个属性的值压入到一个数组中
            return values;
        }
    }

    /**
     *  一个静态方法, 传入一个对象, 克隆一个新对象并返回
     *
     * @param {Object} object
     * @return {Array}
     **/

    if(!Object.clone){
        Object.clone = function (object) {
            return extend({}, object);
        }
    }



    /**
     * 快速对象检查 - 这主要用于告诉
     * 当我们知道值时，从原始值的对象
     * 是一种JSON兼容类型
     *
     * @param {*} obj
     * @return {Boolean}
     */

    function isObject(obj) {
        return obj !== null && typeof obj === 'object'
    }

    /**
     * 严格对象类型检查。 仅对纯JavaScript对象返回true。
     *
     * @param {*} obj
     * @return {Boolean}
     */

    var toString = Object.prototype.toString;
    var OBJECT_STRING = '[object Object]';

    function isPlainObject(obj) {
        return toString.call(obj) === OBJECT_STRING;
    }


    /**
     * 将对象数组合并到单个对象中。
     */
    function toObject(arr) {
        var res = {};
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                extend(res, arr[i]);
            }
        }
        return res
    }


    /**
     * 检查数组.
     *
     * @param {*} obj
     * @return {Boolean}
     */

    var isArray = Array.isArray;


    /**
     * 定义属性.
     *
     * @param {Object} obj
     * @param {String} key
     * @param {*} val
     * @param {Boolean} [enumerable]
     */

    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        });
    }

    /**
     * 输入在给定的等待时间后停止到达才被调用传进的函数。
     *
     * @param {Function} func
     * @param {Number} wait
     * @return {Function} - the debounced function
     */

    function _debounce(func, wait) {
        var timeout, args, context, timestamp, result;
        var later = function later() {
            debugger;
            var last = Date.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) {
                	context = args = null
                };
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            return result;
        };
    }

//延迟执行,确保wait时间内只执行一次
    function delay(func, wait) {
        var timeout;
        wait = (wait == null ? 20 : wait);
        if (timeout){
        	clearTimeout(timeout);
        }
        timeout = setTimeout(func, wait);
    }


    /**
     * 函数柯里化
     *
     **/

    function curry(fn) {
        var args = [].slice.call(arguments, 1);
        return function () {
            var newArgs = args.concat([].slice.call(arguments));
            return fn.apply(null, newArgs);
        }
    }

    /**
     * 手动indexOf，因为它比原生稍快
     *
     * @param {Array} arr
     * @param {*} obj
     */

    function indexOf(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return i;
            }
        }
        return -1;
    }


    /**
     *  一个静态方法, 传入一个数组, 克隆一个新数组并返回
     *
     * @param {Array} Array
     * @return {Array}
     **/


    //不如 array.slice() 比较直接
    Array.clone = function (array) {
        var arr = [];
        for (var i = 0, len = array.length; i < len; i++) {
            arr.push(array[i]);
        }
        return arr;
    };


    //时间测试
    function test(fn, array ,index) {
        var s, d;
        // 记录执行的起始时间
        s = new Date().getTime();
        // 执行待测试的方法
        var result = fn(array, index);
        // 记录执行的结束时间
        d = new Date().getTime();
        // 输出待测试方法所运行的结果和耗时
        console.log( '计算耗时：' + (d-s) + '毫秒' );
        return result;
    }


    var arr = (function (arg){
        var array = [];
        for (var i = 0, len = arg; i < len; i++) {
            array.push(i);
        }
        return array;
    })(5000);


    // test(indexOf, arr, 4500);


/**
     * 异步回调函数的可取消版本.
     *
     * @param {Function} fn
     * @return {Function}
     */

    function cancellable(fn) {
        var cb = function cb() {
            if (!cb.cancelled) {
                return fn.apply(this, arguments);
            }
        };
        cb.cancel = function () {
            cb.cancelled = true;
        };
        return cb;
    }

    /**
     * 如果它们是纯对象，它们是否具有相同的形状？
     *
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     */

    function looseEqual(a, b) {
        /* eslint-disable eqeqeq */
        return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
        /* eslint-enable eqeqeq */
    }


    var hasProto = ('__proto__' in {});

// 浏览器环境
    var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

//UA判断浏览器特定的怪癖
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && UA.indexOf('trident') > 0;
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    var isAndroid = UA && UA.indexOf('android') > 0;
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

    var transitionProp = undefined;
    var transitionEndEvent = undefined;
    var animationProp = undefined;
    var animationEndEvent = undefined;

// 动画属性/事件嗅探
    if (inBrowser && !isIE9) {
        var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
        var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
        transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
        transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
        animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
        animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
    }


// 判断一个函数是否为原生对象
    function isNative(Ctor) {
        return (/native code/.test(Ctor.toString())
        );
    }

    var _Set = undefined;
//兼容Set对象
    if (typeof Set !== 'undefined' && isNative(Set)) {
        _Set = Set;
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = function () {
            this.set = Object.create(null);
        };
        _Set.prototype.has = function (key) {
            return this.set[key] !== undefined;
        };
        _Set.prototype.add = function (key) {
            this.set[key] = 1;
        };
        _Set.prototype.clear = function () {
            this.set = Object.create(null);
        };
    }


//储存对象
    function Cache(limit) {
        this.size = 0;
        this.limit = limit;
        this.head = this.tail = undefined;
        this._keymap = Object.create(null);
    }

    var p = Cache.prototype;

    /**
     * 将<value>放入与<key>相关联的缓存中。返回已删除的条目以为新条目腾出空间。否则返回undefined。
     *（即如果已经有足够的空间）
     *
     * @param {String} key
     * @param {*} value
     * @return {Entry|undefined}
     */


    p.put = function (key, value) {
        // debugger;
        var removed;

        var entry = this.get(key, true);
        if (!entry) {
            if (this.size === this.limit) {
                removed = this.shift();
            }
            entry = {
                key: key
            };
            this._keymap[key] = entry;
            if (this.tail) {
                this.tail.newer = entry;
                entry.older = this.tail;
            } else {
                this.head = entry;
            }
            this.tail = entry;
            this.size++;
        }
        entry.value = value;

        return removed;
    };


    /**
     * 获取并注册最近使用的<key>。返回与<key>相关联的值，如果不在缓存中，则返回undefined
     *
     * @param {String} key
     * @param {Boolean} returnEntry
     * @return {Entry|*}
     */

    p.get = function (key, returnEntry) {
        // debugger;
        var entry = this._keymap[key];
        if (entry === undefined) return;
        if (entry === this.tail) {
            return returnEntry ? entry : entry.value;
        }

        //   A  B  C  <D>  E
        if (entry.newer) {
            if (entry === this.head) {
                this.head = entry.newer;
            }
            entry.newer.older = entry.older; // C <-- E.
        }

        if (entry.older) {
            entry.older.newer = entry.newer; // C. --> E
        }

        entry.newer = undefined; // D --x
        entry.older = this.tail; // D. --> E

        if (this.tail) {
            this.tail.newer = entry; // E. <-- D
        }

        this.tail = entry;
        return returnEntry ? entry : entry.value;
    };

    /**
     * 清除最近使用的（最老的）从缓存中的条目。返回删除的条目或未定义的，如果缓存是空的。
     */

    p.shift = function () {
        // debugger;
        var entry = this.head;
        if (entry) {
            this.head = this.head.newer;
            this.head.older = undefined;
            entry.newer = entry.older = undefined;
            this._keymap[entry.key] = undefined;
            this.size--;
        }
        return entry;
    }


    /**
     * 是否为promise对象
     */
    function isPromise(val) {
        return val && typeof val.then === 'function'
    }


    /**
     * 返回一个 键/值 的数组对象
     *
     * @param {object or Array} map
     * @return { Array }
     */
    function normalizeMap(map) {
        return Array.isArray(map)
            ? map.map(function (key) {
            return ({key: key, value: key});
        })
            : Object.keys(map).map(function (key) {
            return ({key: key, value: map[key]});
        })
    }


    //向html的头部写css
    function writeCss(name, content) {
        var css,
            html = '',
            backUp = '',
            reg;
        if (document.getElementsByTagName('style').length) {
            css = document.getElementsByTagName('style')[0]
        }
        else {
            css = document.createElement("style");
            css.type = "text/css";
        }
        html = css.innerHTML;
        if (html.indexOf(name) !== -1) {
            reg = new RegExp(name + '{' + '.*' + '}', 'i');
            backUp = html.match(reg)[0];
            css.innerHTML = html.replace(backUp, "");
        }
        backUp = backUp.match(/{(.*)}/i);
        if (backUp !== null) {
            content = (backUp[1] + ';' + content).replace(/;+/i, ';');
        }
        if (/@key/.test(name)) {
            name = name.replace("@key", " ");
            content = "@-" + tl.sys.pf + "-keyframes " + name + "{" + content + "}";
        } else {

            content = name + "{" + content + "}";
        }
        var content = document.createTextNode(content);
        css.appendChild(content);
        document.getElementsByTagName("head")[0].appendChild(css);
    }

    //writeCss('.cdx_bg2', "background-image: url(" + imgData + ")");


    /**
     * 从一个给定的数组arr中,随机返回num个不重复项
     *
     **/
    function getArrayItems(arr, num) {
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = [];
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = [];
        for (var i = 0; i < num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length > 0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array.push(temp_array[arrIndex]);
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    }

    // getArrayItems([1,3,4,10] , 2) ;



(function () {

    //获取一个区间的随机值
    function getRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //检测对象是否存在数组
    function indexOf(arr, obj) {
        for (var i = 0, len = arr.length; i < len; i++) {
            //如果等于就是存在
            if (arr[i] === obj) {
                return i;
            }
        }

        return -1;
    }

    //获取指定个数 ， 指定区间的数组 
    var getRangeRandomArr = function (num, min, max) {
        var arr = [];
        var maxNum = max - min;
        
        if (typeof num !== 'number') {
          throw Error('请确保 num 为数字');
        }

        if (num < 1 || num > maxNum) {
          throw Error('请确保 num 为区间的有效范围');
        }

        for (var i = 0; i < num; i++) {
            //获取范围整数
            var random = getRange(min, max);

            //判断是否存在数组
            if (indexOf(arr, random) !== -1) {
                i--;
            } else {
                arr.push(random);
            }
        }

        return arr;
    };

    const getRange = function (min, max) {
        let range = max - min;
        return Math.round(Math.random() * range) + min;
    };


    // getRangeRandomArr(3, 2, 32)

})();


    /**
     * 从一个给定的数组arr中,随机返回1个
     *
     **/

    function randomElemnt(array) {
        if (array.length == 0) {
            throw new Error('the array is empty')
        }
        return array[Math.floor(Math.random() * array.length)]
    }

    //randomElemnt([1,3,4,10])



    var debug = false, util = {}, { slice } = [];


     function warn(msg) {
        if (typeof console !== 'undefined' && debug) {
            console.warn('[VueResource warn]: ' + msg);
        }
    }

     function error(msg) {
        if (typeof console !== 'undefined') {
            console.error(msg);
        }
    }

     function trim(str) {
        return str.replace(/^\s*|\s*$/g, '');
    }

     function toLower(str) {
        return str ? str.toLowerCase() : '';
    }

     function toUpper(str) {
        return str ? str.toUpperCase() : '';
    }

     var isArray = Array.isArray;

     function isString(val) {
        return typeof val === 'string';
    }

     function isBoolean(val) {
        return val === true || val === false;
    }

     function isFunction(val) {
        return typeof val === 'function';
    }

     function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

     function isPlainObject(obj) {
        return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }

     function isBlob(obj) {
        return typeof Blob !== 'undefined' && obj instanceof Blob;
    }

     function isFormData(obj) {
        return typeof FormData !== 'undefined' && obj instanceof FormData;
    }


     function options(fn, obj, opts) {

        opts = opts || {};

        if (isFunction(opts)) {
            opts = opts.call(obj);
        }

        return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
    }

     function each(obj, iterator) {

        var i, key;

        if (obj && typeof obj.length == 'number') {
            for (i = 0; i < obj.length; i++) {
                iterator.call(obj[i], obj[i], i);
            }
        } else if (isObject(obj)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(obj[key], obj[key], key);
                }
            }
        }

        return obj;
    }

     var assign = Object.assign || _assign;

     function merge(target) {

        var args = slice.call(arguments, 1);

        args.forEach((source) => {
            _merge(target, source, true);
    });

        return target;
    }

     function defaults(target) {

        var args = slice.call(arguments, 1);

        args.forEach((source) => {

            for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

        return target;
    }

    function _assign(target) {

        var args = slice.call(arguments, 1);

        args.forEach((source) => {
            _merge(target, source);
    });

        return target;
    }

    function _merge(target, source, deep) {
        for (var key in source) {
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                    target[key] = {};
                }
                if (isArray(source[key]) && !isArray(target[key])) {
                    target[key] = [];
                }
                _merge(target[key], source[key], deep);
            } else if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
    }