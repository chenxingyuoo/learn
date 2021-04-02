/**
 * Created by mac on 16/1/24.
 */
/**
 * Created by Wind on 2016/1/11.
 */
(function ($) {
    //判断浏览器含有属性类型
    var _prefix = (function (temp) {
        var prefix = ["webkit", "Moz", "o", "ms"];
        var props = "";
        for (var i = 0; i < prefix.length; i++) {
            props = prefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + prefix[i].toLowerCase() + "-";
            }
        }
        return false;
        //猜测这里是随意创造一个节点，然后尝试判断该节点是否可以拥有该属性
    })(document.createElement(PageSwitch));

    //在这个函数类定义PageSwitch这个类
    var PageSwitch = (function () {
        //在这里传递进来的element代表的是一个jquery单对象，这里就是id为container的jquery对象
        //this指代的就是这个当前引用创建的PageSwitch的对象，实际上指代的就是前面的instance对象
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }

        //以下为定义PageSwitch的方法
        PageSwitch.prototype = {
            init : function () {
                //现在这里的this指的是一个变量，它保存有的jqueryDOM元素是id为container的div
                var me = this;
                //定位到默认的selectors的变量
                me.containers = me.settings.containers;
                //查找到符合情况的jquery元素
                me.sections = me.element.find(me.containers.sections);
                me.section = me.sections.find(me.containers.section);

                me.vertical = me.settings.vertical;
                me.pagesCounts = me.pageCount();
                me.activeIndex = (me.settings.activeIndex >= 0 && me.settings.activeIndex < me.pagesCounts) ? me.settings.activeIndex : 0;
                //添加事件
                me.canScroll = true;

                if (!me.vertical) {
                    me._initLayout();
                }
                if (me.settings.pagination) {
                    me._initPage();
                }

                me._initEvent();
            },
            //获取有多少页
            pageCount : function () {
                return this.section.length;
            },
            //获取一个屏的长度或者高度
            switchLength : function () {
                return this.direction ? this.element.height() : this.element.width();
            },
            //页码条初始化
            _initPage : function () {
                var me = this;
                var pageClass = me.containers.page.substring(1);
                me.activeClass = me.containers.activeClass.substring(1);
                var pageHTML = "<ul class='" + pageClass + "'>";
                for (var i = 0; i < me.pagesCounts; i++) {
                    pageHTML += "<li></li>";
                }
                pageHTML += "</ul>";
                me.element.append(pageHTML);
                var pages = me.element.find("ul" + me.containers.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(0).addClass(me.activeClass);
            },
            _initLayout : function () {
                var me = this;
                var width = (me.pagesCounts * 100) + "%";
                var cellWidth = (100 / me.pagesCounts).toFixed(2) + "%";
                //这里采用sections，因为使用transition的时候，就是使用sections的div进行相对位移的
                me.sections.width(width);
                me.section.width(cellWidth).addClass("left");
            },
            //加载事件监听器
            _initEvent : function () {
                var me = this;
                //加载页码点击监听器
                if (me.pagination) {
                    me.element.find(me.containers.page + " li").on("click", function () {
                        me.activeIndex = $(this).index();
                        me._scrollPage();
                    });
                }
                //页面点击监听:点击页码产生下一页
                me.sections.on("click", function () {
                    me._nextPage();
                });

                //设置鼠标滚轮事件
                me.element.on("mousewheel DOMMouseScroll", function (e) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.wheelDelta;
                        if (delta > 0 && (me.activeIndex && !me.settings.loop || me.settings.loop)) {
                            me._prevPage();
                        } else if (delta < 0 && (me.activeIndex < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                            me._nextPage();
                        }
                    }
                );
                //设置键盘方向键事件
                if (me.settings.keyboard) {
                    $(window).on("keypress", function (e) {
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            me._prevPage();
                        } else if (keyCode == 39 || keyCode == 40) {
                            me._nextPage();
                        }
                    });
                }
                //浏览器窗口大小改变触发的事件
                $(window).resize(function () {
                        var currentLength = me.switchLength();
                        var offset = me.settings.vertical ? me.section.eq(me.activeIndex).offset().top : me.section.eq(me.activeIndex).offset().left;
                        if (Math.abs(offset) > currentLength / 2 && me.activeIndex < (me.pagesCounts - 1)) {
                            me.activeIndex++;
                        }
                        if (me.activeIndex) {
                            me._scrollPage();
                        }
                    }
                );
                //当动画Transition的css动画执行完毕后，调用该事件方法
                me.sections.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend", function () {
                    me.canScroll = true;
                    if (me.settings.onPageSwitch && $.type(me.settings.onPageSwitch) == "function") {
                        me.settings.onPageSwitch();
                    }
                })
            },
            //上一页
            _prevPage : function () {
                var me = this;
                //在这里判断是否可以上一页（动画是否播放完毕）,在这里的原因是：如果不能进行上一页，则不做改变，activeIndex不会改变，
                //但如果在_scrollPage()方法里面判断，此时activeIndex已经改变,但如果scrollPanel为false，则下一次滚动会跳页
                if (me.canScroll) {
                    if (me.activeIndex > 0) {
                        me.activeIndex--;
                    } else if (me.settings.loop) {
                        me.activeIndex = me.pagesCounts - 1;
                    }
                    me._scrollPage();
                }
            },
            //上一页
            _nextPage : function () {
                var me = this;
                if (me.canScroll) {
                    if (me.activeIndex < me.pagesCounts - 1) {
                        me.activeIndex++;
                    } else if (me.settings.loop) {
                        me.activeIndex = 0;
                    }
                    me._scrollPage();
                }
            }
            ,
            //其实本质就是activeIndex被更改了，然后在这里修改相应的样式
            _scrollPage : function () {
                var me = this;
                var activeFace = me.section.eq(me.activeIndex).position();
                if (!activeFace)return;
                me.canScroll = false;
                //拥有该样式
                if (_prefix) {
                    me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    var translate = me.vertical ? "translateY(-" + activeFace.top + "px)" : "translateX(-" + activeFace.left + "px)";
                    me.sections.css(_prefix + "transform", translate);
                } else {
                    var animateCss = me.direction ? {top : -activeFace.top} : {left : -activeFace.left};
                    me.sections.animate(animateCss, me.settings.duration, function () {
                        me.canScroll = true;
                        if (me.settings.onPageSwitch && $.type(me.settings.onPageSwitch) == "function") {
                            me.settings.onPageSwitch();
                        }
                    })
                }
                if (me.settings.pagination) {
                    me.pageItem.eq(me.activeIndex).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();
    //把这个类作为一个函数闭包（插件）添加到jQuery中
    $.fn.PageSwitch = function (options) {
        console.log("start");
        //对选中的jquery容器做一个循环，依次调用里面的元素
        return this.each(function () {
            var me = $(this);
            var instance = me.data("PageSwitch");
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
            }
            //如果传进来的不是对象而是字符串，则调用这个方法
            if ($.type(options) === "string")return instance[options]();
        })
    };
    //定义一个默认配置
    $.fn.PageSwitch.defaults = {
        containers : {
            container : "#container",//容器
            sections : ".sections",//第二层
            section : ".section",//子节点层
            intro : ".intro",//装载页面的内容
            page : ".pages",//页码条ul
            activeClass : ".active"//被激活的页码条
        },
        activeIndex : 2,//默认起始页面
        easing : "ease-in-out",//特效方式，ease-in,ease-out,linear
        duration : 1000,//每次动画执行的时间
        pagination : true,//是否显示分页，右边中间的分页条
        loop : true,//是否循环
        keyboard : true,//是否支持键盘
        vertical : false,//滑动方向，默认为true，或者false(horizontal)
        onPageSwitch : ""//换页回调函数
    };
    $("#container").PageSwitch({
        loop : true,
        vertical : false

    });

})
(jQuery);

