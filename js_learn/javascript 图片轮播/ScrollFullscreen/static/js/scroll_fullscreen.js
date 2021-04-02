/**
 * Created by Administrator on 2016/9/2.
 *图片滚动效果
 *@author 陈星宇 271173104@qq.com
 *@jQuery or @String box : 滚动列表jQuery对象或者选择器 如：滚动元素为li的外层ul
 *@object config : {
 *    @Boolean vertical : true为垂直滚动 ， false为水平滚动 ， 默认为true
 *    @Number min_move_size : 最小的滑动距离 ， 滑动距离不超过这个值则不切换页面
 *    @Number scroll_time : 滚动动画所需要的毫秒数 ，默认600ms
 *    @Number index : 索引值 ， 指定从第几页开始 ， 从0开始
 *    @Number size : 列表长度，默认为box里面所有一级子元素个数[如果size不等于一级子元素个数，则不支持循环滚动]
 *    @Function callback : 滚动完回调函数
 *}
 **/

;(function (window, factory){
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = factory;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() {
            return factory;
        });
    } else {
        window.ScrollFullscreen = factory(window.Zepto  || {});
    }
})(this, function ($){


    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    })();


    window.cancelAnimFrame = (function (){
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
    })();

    //默认配置
    var defaults = {
        vertical: true,  //滑动方向 ， 默认垂直
        min_move_size: 30,  //最小滑动距离
        scroll_time : 600,
        index : 1
    };

    var ScrollFullscreen = function (ele, opts) {
        if (typeof ele === 'string') {
            this.obj = $(ele);
        } else {
            this.obj = ele
        }
        this.start_x = null;  //手指触下的x坐标
        this.start_y = null;  //手指触下的y坐标
        this.point_x = null;  //记录一个x坐标
        this.point_y = null;  //记录一个y坐标
        this.now_left = 0;    //x坐标滑动的距离
        this.now_top = 0;     //y坐标滑动的距离
        this.is_move_left = null;  //记录是否向左边滑动
        this.is_move_top = null;   //记录是否向上边滑动
        this.move_size_x = 0;        //用来判断滚动距离
        this.move_size_y = 0;        //用来判断滚动距离
        this.currentPage = null;
        this.children = this.obj.children();   //获取盒子下所有的元素
        this.firstEle = this.children.eq(0);   //获取盒子下第一个元素
        this.height = this.firstEle.height() || 500;  //获取一个元素的高度
        this.width = this.firstEle.width() || 500;    //获取一个元素的宽度
        this.size = this.children.length;   //获取元素的个数
        this.max_height = this.children.length * this.height;
        this.timer = null;  //优化touchmove的定时器
        this.lock = false;  //锁定
        this.opts = opts;   //获取参数对象
        this.init();        //初始化
    };

    ScrollFullscreen.prototype = {
        init: function () {
            var self = this;
            //设置样式
            self.obj.css('height', self.max_height + 'px');
            self.obj.parent().css('overflow','hidden');

            //合并参数
            self.setDefaults();

            //判断index的范围
            self.config.index = self.config.index < 0 ? 0 : self.config.index;
            self.config.index = self.config.index >= self.size ? (self.size - 1) : self.config.index;

            //指定页面索引 ， 跳转到指定位置， 指定第二个参数是初始化的时候
            self.goIndex(self.config.index, true);

            //绑定事件
            self.bindEvent();
        },
        //合并参数 , 赋值给config
        setDefaults: function () {
            this.config = $.extend(defaults, this.opts || {});
        },
        //绑定事件
        bindEvent: function () {
            var self = this;
            self.obj.on('touchstart', function (e) {
                e.preventDefault();
                if (e.touches.length == 1 && !self.lock) {
                    self.point_x = self.start_x = parseInt(e.touches[0].screenX);
                    self.point_y = self.start_y = parseInt(e.touches[0].screenY);
                }
            }).on('touchmove', function (e) {
                e.preventDefault();
                if (e.touches.length == 1 && !self.lock) {
                    //获取手指滑动到当前位置的x ， y坐标
                    var move_x = parseInt(e.touches[0].screenX);
                    var move_y = parseInt(e.touches[0].screenY);
                    /*window.setTimeout(function (){

                    }, 10);*/

                    self.timer = window.requestAnimFrame(function (){
                        return self.move(move_x, move_y);
                    });

                }
            }).on('touchend', function (e) {
                e.preventDefault();
                window.requestAnimFrame(function (){
                    window.cancelAnimFrame(self.timer);
                    !self.lock &&　self.moveEnd();
                });
            });
        },
        //滑动屏幕处理函数
        move: function (move_x, move_y) {
            var self = this;
            //移动的x值减去 触摸时的 x值
            var changeX = move_x - (self.point_x === null ? move_x : self.point_x);  //需要判断move_start的值？
            //移动的y值减去 触摸时的 y值
            var changeY = move_y - (self.point_y === null ? move_y : self.point_y);
            var notPreventDefault = false,
                sin = changeY / Math.sqrt(changeX * changeX + changeY * changeY);

            if (sin > Math.sin(Math.PI / 3) || sin < -Math.sin(Math.PI / 3)) {//滑动屏幕角度范围：PI/3  -- 2PI/3
                notPreventDefault = true;  //不阻止默认行为
            }

            self.now_left = self.now_left + changeX;  //现在x坐标的位置
            self.now_top = self.now_top + changeY;    //现在y坐标的位置

            self.is_move_left = move_x - self.start_x < 0;  //是否向左移动
            self.is_move_top = move_y - self.start_y < 0;   //是否向上移动

            self.point_x = move_x;
            self.point_y = move_y;

            //设置样式
            self.obj.css(self.getStyle(2));

            return notPreventDefault;
        },
        //滑动屏幕结束处理函数
        moveEnd : function (){
            var self = this;

            //向y坐标滑动
            function scrollEndY(){
                //向上移动 ,并且值小于等于指定的值
                if(self.is_move_top  && self.now_top <= self.move_size_y - self.config.min_move_size){
                    self.config.index = self.config.index + 1;
                    //向下移动 ,并且值小于等于指定的值
                }else if(!self.is_move_top  && self.now_top >= self.move_size_y + self.config.min_move_size){
                    self.config.index = self.config.index - 1;
                }
            }

            //向x坐标滑动
            /*function scrollEndX(){
             //向左移动
             if(self.is_move_left){

             }else{

             }
             }*/

            //如果是垂直滚动
            if(self.config.vertical){
                scrollEndY();
            }else{

            }

            //触摸结束point_x ， point_x 清空
            self.point_x = self.point_y = null;

            //去到索引位置
            self.goIndex(self.config.index);
        },
        //滚动到指定索引值
        goIndex : function (index, is_init){
            var self = this;
            //锁定
            if (self.lock) return;
            self.lock = true;

            //判断index的范围
            index = index < 0 ? 0 : index;
            index = index >= self.size ? (self.size - 1) : index;

            //index修复
            self.config.index = index;
            //获取当前页面的top值
            var top = -(self.height * self.config.index );
            //设置top值
            self.now_top = top;
            self.move_size_y = top;

            //is_init为true的时候说明是初始化的时候执行
            var num = is_init ? 2 : 1;
            //设置样式
            self.obj.css(self.getStyle(num));

            //动画完成执行函数
            setTimeout(function(){
                self.complete();
            },self.config.scroll_time);
        },
        //下一页滚动
        next : function () {
            var self = this;
            if (!self.lock) {
                self.goIndex(self.config.index + 1);
            }
        },
        //上一页滚动
        prev : function () {
            var self = this;
            if (!self.lock) {
                self.goIndex(self.config.index - 1);
            }
        },
        //动画完成执行函数
        complete : function () {
            var self = this;
            //锁定
            self.lock = false;

            //获取得到当前的这一页
            self.currentPage = self.children.eq(self.config.index);

            //当前页面获取高亮样式 active
            self.currentPageGetActive();

            //执行参数里边的回调函数
            self.config.callback ? self.config.callback(self) : '';

        },
        //当前页面获取高亮样式 active
        currentPageGetActive : function (){
            var self = this;
            //如果没有该样式
            if(!self.currentPage.hasClass('active')){
                self.children.removeClass('active');
                self.currentPage.addClass('active');
            }
        },
        /*
         获取动画样式，要兼容更多浏览器，可以扩展该方法
         @int fig : 1 动画 2  没动画
         */
        getStyle: function (fig) {
            var self = this;
            var x = self.now_left,
                y = self.now_top,
                time = fig == 1 ? this.config.scroll_time : 0,
                _style = {
                    '-webkit-transition': '-webkit-transform ' + time + 'ms ease',
                    'transition': 'transform ' + time + 'ms ease',
                };

            //如果是垂直滚动
            if(self.config.vertical){
                _style['-webkit-transform'] = 'translate3d(0,' + y + 'px,0)';
                _style['transform'] = 'translate3d(0,' + y + 'px,0)';
                return _style;
            }else{
                _style['-webkit-transform'] = 'translate3d(' + x + 'px,0,0)';
                _style['transform'] = 'translate3d(' + x + 'px,0,0)';
                return _style;
            }
        }
    };

    return ScrollFullscreen;
});