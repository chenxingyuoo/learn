/**
 * 拖动事件
 * Created by chenxingyu on 2017/4/15.
 */
//拖动的标识
var isDragging = false;
//判断是否支持 Touch 事件
var supportTouch = 'ontouchstart' in window;

(function (global, factory){

    if (typeof define === 'function' && define.amd) {
        define([''], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        //否则暴露给window
        global.draggable = factory();
    }

})(window, function (){

    //draggable 函数
    return function(element, options) {

        const moveFn = function (event){
            //执行drag函数
            if (options.drag) {
                options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }
        };

        const endFn = function (event){
            //移除事件
            if (!supportTouch) {
                document.removeEventListener('mousemove', moveFn);
                document.removeEventListener('mouseup', endFn);
            }
            document.onselectstart = null;
            document.ondragstart = null;

            isDragging = false;

            //执行end函数
            if (options.end) {
                options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }
        };

        //绑定start事件
        element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
            //正在拖动则 return
            if (isDragging){
                return;
            }

            document.onselectstart = function() { return false; };
            document.ondragstart = function() { return false; };

            //支持鼠标拖动事件
            if (!supportTouch) {
                document.addEventListener('mousemove', moveFn);
                document.addEventListener('mouseup', endFn);
            }

            isDragging = true;

            //执行start函数
            if (options.start) {
                event.preventDefault();
                options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
            }

        });

        //支持touch事件
        if (supportTouch) {
            element.addEventListener('touchmove', moveFn);
            element.addEventListener('touchend', endFn);
            element.addEventListener('touchcancel', endFn);
        }
    };


});


