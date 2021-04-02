/**
 * Created by Administrator on 2016/8/29.
 */
"use strict";

//移动盒子 , 绑定事件， 实现元素进行拖拽
function MoveBox(opts) {
    opts = opts || {};
    var el = typeof opts.el === 'string' ? document.querySelector(opts.el) : opts.el;
    var timer = null;
    var obj = {
        event: null,
        el: el,
        disX: null,
        disY: null,
        l2: null,
        k2: null
    };

    //监听事件
    el.addEventListener('mousedown', function (e) {
        obj.event = e;
        obj.disX = e.clientX - el.offsetLeft;
        obj.disY = e.clientY - el.offsetTop;
        obj.l2 =  e.clientX - obj.disX;
        obj.k2 = e.clientY - obj.disY;

        //移动开始对象
        var moveStartObj = Object.assign({}, obj);
        //执行回调函数
        opts.moveStart ? opts.moveStart(moveStartObj) : '';

        //设置捕获范围
        if (obj.el.setCapture) {
            obj.el.setCapture();
        } else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }

        //解决拖不动图片的问题
        document.ondragstart = function () {
            return false;
        };

        //鼠标移动
        document.onmousemove = function (e) {
            e.stopPropagation();

            //这里应该写一个回调函数 ， 理由： 比较灵活
            timer = window.requestAnimFrame(function () {
                //获取偏移值
                obj.l2 = e.clientX - obj.disX;
                obj.k2 = e.clientY - obj.disY;

                //设置样式
                obj.el.style.left = obj.l2 + 'px';
                obj.el.style.top = obj.k2 + 'px';

                //执行回调方法
                opts.move ? opts.move(obj) : '';

            });
        };

        //鼠标松开
        document.onmouseup = function (e) {
            window.cancelAnimFrame(timer);

            //取消捕获范围
            if (el.releaseCapture) {
                el.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            //解除事件
            document.onmousemove = null;
            document.onmouseup = null;

            //执行回调方法
            opts.moveEnd ? opts.moveEnd(obj) : '';
        };

    }, false);


}

module.exports = MoveBox;

