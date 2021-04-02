/**
 * Created by mac on 16/3/18.
 */
(function () {

    //判断数据类型，这样写法相对简便，可以按需产生对应函数
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }
    var isObject = isType("Object")
    var isString = isType("String")
    var isArray = Array.isArray || isType("Array")
    var isFunction = isType("Function")


    var es = function (selector) {
        return new es.prototype.init(selector);
    }

    es.reader = function (fn) {
        document.addEventListener('DOMContentLoaded', function () {
            // fn 存在 ， 并且执行它
            fn && fn()
        },false)
    };


    //循环 ， 判断是否是数组
    es.each = function(obj, cb) {
        var ret, i = 0;
        if (obj.length === +obj.length && isArray(obj)) { //鸭辩
                 //if obj.length !== i
            while(obj.length !== i) {
                       //将obj元素依次调用cb函数
                ret = cb.call(obj[i], i, obj[i]);
                if (ret === 'break') {
                    break;
                }
                if (ret !== undefined) {
                    return ret;
                }
                i++;
            }
        }
        //if 是对象
        else if (obj instanceof Object) {
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                             ////将obj元素依次调用cb函数，这里指向循环到的对象 obj[k] ， 所有 k = k , v = obj[k]
                    ret = cb.call(obj[k], k, obj[k]);
                    if (ret === 'break') {
                        break;
                    }
                    if (ret !== undefined) {
                        return ret;
                    }
                }
            }
        }
    };
    
    
    es.event = function () {
        var events = [],
            types = ['click'];
        return {
            on : function (type, cb) {
                debugger
                var arr = events[type] = events[type] || [];

                if(type.indexOf[type] !== -1){
                    es.each(this, function (k, v) {
                        v.addEventListener(type, cb)
                    })
                }

                //如果arr数组中没有这个回调函数 ， 添加进去
                if(arr.indexOf(cb) === -1){
                    arr.push(cb);
                }
                return this;
            }
        }
    }()


    /*es.ajaxs = function (opt) {
        debugger
        var fd = new FormData();
        var callback = opt.callback || function () {};
        var success = opt.success || function () {};
        var error = opt.error || function () {};
        var type = opt.type || 'get'
        var req = creatajax();
        var respon;

        if( type != 'get'){
            for(var i in opt.data){
                fd.append(i , opt.data[i]);
            }
        }

        //自定义响应头
        //req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.open(type, opt.url, true);
        req.onreadystatechange = function () {
            debugger
            if(req.readyState === 4){
                if(req.status === 200 ){
                    respon =  req.response || req.responseText
                    success(req,respon);
                }else{
                    error(new TypeError(respon))
                }
            }
        }
        req.onerror = function() {
            callback(new Error(respon));
        };
        req.send(opt.data ? fd : '');
    }*/

    function creatXhr(){
        var ajax=null;
        if (window.XMLHttpRequest){
            //对于Mozilla、Netscape、Safari等浏览器，创建XMLHttpRequest对象
            ajax = new XMLHttpRequest();
            if (ajax.overrideMimeType){
                //如果服务器响应的header不是text/xml，可以调用其它方法修改该header
                ajax.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject){
            // 对于Internet Explorer浏览器，创建XMLHttpRequest
            try{
                ajax = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e){
                try{
                    ajax = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e){}
            }
        }
        return ajax;
    }


    //extend方法来自jquery
    es.extend = function(){
        debugger
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && _.type(target) !== "function") {
            target = {};
        }
        // extend caller itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }
        for (;i < length; i++) {
            // Only deal with non-null/undefined values
            debugger
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (_.isPlainObject(copy) || (copyIsArray = _.type(copy) === "array"))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && _.type(src) === "array" ? src : [];
                        } else {
                            clone = src && _.isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = _.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    };


    es.defaults = {
        dataType : 'json',
        type : 'type',
        timeout : 0,
        async : true
    }


    es.ajax = function (opt) {
        return this.transmit(opt)
    }

    es.upload = function (opt) {
        return this.transmit(opt,'upload');
    }

    es.transmit = function (opt,type) {
        var that = this,
            xhr = creatXhr(),
            _event = type === 'upload' ? xhr.upload : xhr;

        if(type === 'upload'){
            opt.type = 'post'
        }

        //传进来的对象参数和默认配置合并 , you有同名参数传进来就覆盖默认的
        var setting = es.option(es.extend({},that.defaults,opt));
        //合并后的对象添加 xhr 这个对象 , 如果是文件 ， 文件就已经保存在这里了 ， 如果重新new xhr 再保存 ， 就是一个新的xhr对象 ， 文件信息不在里面 ， 就没有任何意义了
        setting.xhr = xhr;
        //然后在xhr 对象 添加 传进来的 setting 和 setting.xhr
        xhr.opt = setting;

        xhr.onreadystatechange = function (e) {
            var _sta = xhr.readyState,
                _status = xhr.status;

            if(_sta === 4 ){
                if(_status === 200 || _status == 302 ){
                    xhr.data = that.resDate(e,setting)
                    setting.success(xhr,xhr.data);
                }else{
                    setting.error(new TypeError(xhr.data));
                }
            }
        }

        xhr.onerror = function() {
            console.log(new Error());
        };

        xhr.open(setting.type, setting.url, setting.async);
        xhr.send(setting.data);
        return xhr;
    }

    //ca参数加工
    es.option = function (opt) {
        var that = this;
        if (opt) {
            opt.success = opt.success || function () {};
            opt.error = opt.error || function () {};
            opt.type = opt.type || 'get';
            opt.url = opt.url;
            opt.data  = _dataFn(opt.data);
            return opt;
        }

        function _dataFn(data){
            var _data=null;
            if(data){
                _data = opt.type == 'get' ? getData() : postData(data);
            }
            return _data;

        }

        function getData(data){
            return null;
        }

        function postData(data){
            var fd = new FormData(),
                i, _cur;
            for(i in data){
                if(data[i] && data[i].constructor === File){
                    _cur = data[i];
                }else{
                    JSON.stringify(_cur = data[i]);
                }

                fd.append(i,_cur);
            }
            return fd
        }
    }

    es.resDate = function (e, opt) {
        var that = this,
            tg = e.target,
            _data,
            dataType = opt.dataType || 'json',
            res = tg.response || tg.responseText;
        switch (dataType){
            case 'text': _data = res;
            default :   try{
                          _data = JSON.parse(res)
                        }catch(e){
                           _data = res
                        }
        }
        return _data
    }










    window.es = es;


})();