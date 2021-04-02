/**
 * Created by mac on 16/1/23.
 */
(function ($){
    //说明 ： 获取浏览器前缀
    //实现： 判断某个元素的css样式中是否存在transition 属性
    //参数 ： dom元素
    //返回值： boolean ， 有则返回浏览器样式前缀 ， 否则返回false
    //私有方法这样定义
    var _prefix = (function (temp){
        var aPrefix = ['webkit','moz','o','ms'],
            props = '';
        for (var i = 0; i < aPrefix.length; i++) {
            props = aPrefix[i] + 'Transition';
            if (temp.style[props] !== undefined){
                return '-' + aPrefix[i].toLowerCase() + '-'
            }
        }
        return false;
     //猜测这里是随意创造一个节点，然后尝试判断该节点是否可以拥有该属性
    })(document.createElement(PageSwitch));

    //公共方法
    var PageSwitch = (function (){  //自执行匿名函数
        
        function PageSwitch(element,options){
            //深拷贝。
            this.settings = $.extend(true, $.fn.PageSwitch.defaults,options || {})//第二个参数是默认配置
            this.element = element; //存放element的值
            this.init();          //初始化init（）方法
        }

        //init方法在PageSwitch的原型上 ， 可以访问到
        PageSwitch.prototype = {
            //说明 ： 初始化插件
            //实现： 初始化dom结构，布局，分页及绑定事件
            init: function () {
                
               var me = this; //this指向最外层PageSwitch对象
               //获取配置defaults里面的 selectors 对象
               me.selectors = me.settings.selectors;
               //父元素
               me.sections = me.element.find(me.selectors.sections);
               //每一个子元素
               me.section = me.sections.find(me.selectors.section);

               me.direction =  me.settings.vertical; //竖屏true ， 横屏false*/

               //页数存放在pagesCount
               me.pagesCount = me.pageCount();

               //判断页数是否<0 或者大于 pagesCount
               me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

               //滚动锁定 ，滚动中为false ，  动画结束后为true ， 只有在该值为true的时候才可以执行滚动
               me.canScroll = true;

               //判断方向 ，默认竖屏 ， 当 vertical 参数为false时才要重新布局变成横屏滚动
               if (!me.direction){
                  me._initLayout();
               }

               //初始化小按钮高亮状态 ， 按 参数中 index 值选中
               if (me.settings.pagination){
                   me._initPaging();
               }

               //绑定事件
               me._initEvent();

               //传 index 参数 ， 不等于 0 的时候就滚动 ， 体验不好 ， 用户一进来就看到屏幕在滚动 ， 有没有解决方案 ？
              if(me.index != 0){
                   me._scrollPage();
               }
            },
            //说明： 获取滑动页面的数量
            pageCount: function (){
                return this.section.length;
            },
            //说明：获取滑动的宽度（横屏滑动） 或者高度 （竖屏滑动）
            switchLength: function (){
                return this.direction ? this.element.height() : this.element.width();
            },
            //说明： 向前滑动即上一个页面
            prev : function (){
                
                var me = this;
                if (me.canScroll) {
                    if (me.index > 0) {
                        me.index--;
                    //循环滚动
                    } else if (me.settings.loop) {
                        me.index = me.pagesCount - 1;
                    }else if (!me.settings.loop){
                        return
                    }
                    me._scrollPage();
                }
            },
            //说明： 向后滑动即下一个页面
            next : function (){
                
                var me = this;
                if (me.canScroll) {
                    if (me.index < me.pagesCount - 1) {
                        me.index++;
                    //循环滚动
                    } else if (me.settings.loop) {
                        me.index = 0;
                    }else if (!me.settings.loop){
                        return
                    }
                    me._scrollPage();
                }
            },
            //说明： 主要正对横屏情况进行页面布局
            _initLayout: function (){
                var me = this;
                var width = (me.pagesCount * 100) + '%',
                    cellWidth = (100/me.pagesCount).toFixed(2)+'%';
                me.sections.width(width);
                me.section.width(cellWidth).css('float','left');

            },
            //说明： 实现分页的dom结构和css样式
            _initPaging: function (){
                var me = this;
                var pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);
                var pageHtml = "<ul class="+pagesClass+">";
                //多少页面
                for (var i = 0, len = me.pagesCount; i <len; i++){
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                me.element.append(pageHtml);
                var pages = me.element.find("ul" +me.selectors.page);
                //把每一个li按钮添加到对象上
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);

                //判断横屏竖屏添加类名
                if (me.direction){
                    pages.addClass('vertical');
                }else{
                    pages.addClass("horizontal");
                }


            },
            //说明： 初始化插件事件
            _initEvent: function (){
                var me = this;

                //点击小按钮切换
                me.element.find(me.selectors.page + " li").on('click',function (){
                    me.index = $(this).index();
                    me._scrollPage();
                }); //点击


                //页面点击监听:点击页面下一页
                me.sections.on("click", function () {
                    me.next();
                });

                //鼠标滚轮判断方向。触发页面滚动
                me.element.on("mousewheel DOMMouseScroll",function (e){
                    //后者是火狐，方向跟其他浏览器相反
                    var delta = e.originalEvent.wheelDelta || - e.originalEvent.detail;

                    // > 0 向上滑
                    if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)){
                        me.prev();
                    // < 0 向下滑
                    }else if(delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)){
                        me.next();
                    }
                });

                //keyboard 判断下面配置的键盘事件
                if (me.settings.keyboard){
                    $(window).on('keydown',function (e){
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38){ //上下键
                            me.prev();
                        }else if (keyCode == 39 || keyCode == 40){//左右键
                         me.next();
                        }
                    })
                }

                //改变页面大小的时候
                $(window).resize(function (){
                   console.log('resize')
                    var currentLength = me.switchLength(),
                        offset = me.settings.vertical ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                    
                    if (Math.abs(offset) > currentLength /2 && me.index < (me.pagesCount - 1)){
                        me.index ++ ;
                    }
                    
                    if (me.index){
                       me._scrollPage();
                    }
                });

                //transitionend动画结束事件
                me.sections.on('webkitTransitionEnd msTransitionend mozTransitionend transitionend',function (){
                    console.log('end')
                    // 滚动锁定恢复
                    me.canScroll = true;
                    //如果有回调函数 ， 并且是 fun ， 执行
                    if (me.settings.callback && $.type(me.settings.callback) == "function"){
                        me.settings.callback();
                    }
                })
            },

            //说明： 滑动动画
            _scrollPage : function (){

                var me = this;
                //获取定位的距离
                var dest = me.section.eq(me.index).position();
                if (!dest){
                   return
                }
                //滚动锁定
                me.canScroll = false;

                //利用css3 的偏移样式来滚动偏移
                if (_prefix){
                   me.sections.css(_prefix + 'transition','all '+me.settings.duration+ 'ms ' + me.settings.easing);
                    var translate = me.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";
                    me.sections.css(_prefix + "transform",translate);

                    me.section.eq(me.index).addClass('active').siblings().removeClass('active');
                }else{
                    //利用绝对定位的属性来滚动偏移
                    var animateCss = me.direction ? {top: - dest.top} : {left : -dest.left};
                    //jquery 动画
                    me.sections.animate(animateCss, me.settings.duration ,function (){
                        //这里没有 transitionend 动画结束事件 ， 所以jquery 动画结束回调函数要 解锁滚动
                        me.canScroll = true;
                        //如果有回调函数 ， 并且是 fun ， 执行
                        if (me.settings.callback && $.type(me.settings.callback) == "function"){
                            me.settings.callback();
                        }
                    })
                }

                //小按钮高亮切换
                if (me.settings.pagination){
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings('li').removeClass(me.activeClass)
                }
            }
        };
            return PageSwitch;  //记得return

    })();

    //把这个类作为一个函数闭包（插件）添加到jQuery中
    $.fn.PageSwitch = function (options){
        return this.each(function (){
            var me = $(this),
                instance = me.data('PageSwitch');
            if (!instance){
                instance = new PageSwitch(me,options);
                me.data('PageSwitch',instance);
            }

            //调用插件实例化init（）方法
            if ($.type(options) === "string"){ //如果用户传进的是字符串，就给调用插件
                return instance[options]();
            }
        })
    };

    //定义一个默认配置
    $.fn.PageSwitch.defaults = {
        selectors : {
            sections : ".sections",
            section : '.section',
            page : '.pages',
            active : '.active'
        },
        index : 0,
        easing : 'ease',
        duration : 500,
        loop : false,
        pagination : true,
        keyboard : true,
        vertical : true, //是否竖屏
        callback : ''
    }
})(jQuery);