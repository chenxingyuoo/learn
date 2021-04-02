/**
 * Created by chenxingyu on 2017/2/10.
 */

window.common = require('./core/common');
window.util = require('./core/utils');
window.API = require('./core/config');

//定时器
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||function(callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function (){
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
})();

