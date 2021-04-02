(function(){
    
    const isArray = Array.isArray;

    /**
     * 对象检查
     * @param {*} obj
     * @return {Boolean}
     */

    function isObject (obj){
      return obj !== null && typeof obj === 'object';
    };

    let toString = Object.prototype.toString;
    let OBJECT_STRING = '[object Object]';

    /**
     * 严格对象类型检查。 仅对纯JavaScript对象返回true。
     * @param {*} obj
     * @return {Boolean}
     */
    function isPlainObject (obj) {
      return toString.call(obj) === OBJECT_STRING;
    };

    /**
     * 深拷贝
     * @param  {object} to   目标对象
     * @param  {object} from 源对象
     * @return {object}      
     */
    function deepCopy(to , from) {
        var to = to || {};
        for (var key in from) {
            if (isPlainObject(from[key]) || isArray(from[key])) {

                if (isPlainObject(from[key]) && !isPlainObject(to[key])) {
                    to[key] = {};   
                }

                if (isArray(from[key]) && !isArray(to[key])) {
                    to[key] = [];
                }

                deepCopy(from[key], to[key]);

            } else {
                to[key] = from[key];
            }
        }
        return to;
    }

    /**
     * 浅拷贝
     * @param  {object} to   目标对象
     * @param  {object} from 源对象
     * @return {object}      
     */
    function extend(to, from) {
        for (var key in from) {
          if(from.hasOwnProperty(key)){
            to[key] = from[key];
          }
        }
        return to
    }

    /**
     * 拷贝数据入口 ， 判断是浅拷贝还是深拷贝
     * @param  {object} to   目标对象
     * @param  {object} from 源对象
     * @return {object}      
     */
    function assign(to, from, deep){
        if (deep === true) {
            return deepCopy(to, from);
        } else{
            return extend(to, from);
        }
    }

    if (module && typeof isObject(module.exprots)) {
        module.exprots = assign;
    } else{
        window.assign = assign;
    }
})();
