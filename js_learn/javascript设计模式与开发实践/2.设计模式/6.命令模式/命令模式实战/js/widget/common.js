/**
 * Created by chenxingyu on 2017/3/6.
 */
"use strict";

//定时器
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||function(callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = (function (){
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
})();
