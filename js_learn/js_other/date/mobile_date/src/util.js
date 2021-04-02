/**
 * Created by chenxingyu on 2017/1/19.
 */

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function ( callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
})();

module.exports = {
    // 返回对象的类型
    type: function type(obj) {
        var type;
        if (obj == null) {
            type = String(obj);
        } else {
            type = {}.toString.call(obj).toLowerCase();
            type = type.substring(8, type.length - 1);
        }
        return type || "object";
    },
    //动画延迟执行
    // requestAnimFrame: requestAnimFrame,
    // cancelAnimFrame: cancelAnimFrame
};