/**
 * Created by Administrator on 2016/9/24.
 */
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

//返回指定区域的随机值
function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}