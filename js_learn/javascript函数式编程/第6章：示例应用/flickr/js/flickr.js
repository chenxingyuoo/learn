/**
 * Created by chenxingyu on 2016/12/6.
 */

//我们的应用将做 4 件事：

// 根据特定搜索关键字构造 url
// 向 flickr 发送 api 请求
// 把返回的 json 转为 html 图片
// 把图片放到屏幕上


require.config({
    paths: {
        ramda: './js/ramda',
        jquery : './js/jquery-2.2.1'
    }
});

require(['ramda', 'jquery'], function(_, $) {

     var trace = _.curry(function(tag, x) {
            console.log(tag, x);
            return x;
     });


    //两个不纯的动作，即从 flickr 的 api 获取数据和在屏幕上放置图片这两件事。我们先来定义这两个动作，这样就能隔离它们了。
    var Impure = {
        getJSON: _.curry(function(callback, url) {
            $.getJSON(url, callback);
        }),

        setHtml: _.curry(function(sel, html) {
            $(sel).html(html);
        })
    };

    var img = function (url) {
        debugger;
        return $('<img src="'+url+'"/>');
    };


    //构造 url 传给 Impure.getJSON 函数。
    var url = function (term) {
        debugger;
        return 'http://127.0.0.1/my_learn/flickr/json/' + term +'.json';

        // return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
    };

    //让我们写一个 app 函数发送请求并把内容放置到屏幕上。

    // var app = _.compose(Impure.getJSON(trace("response")), url);

    // app("flickr");


    // 这会调用 url 函数，然后把字符串传给 getJSON 函数。
    // getJSON 已经局部应用了 trace，加载这个应用将会把请求的响应显示在 console 里。


    //不管怎样，我们可以使用 ramda 的一个通用 getter 函数 prop() 来获取这些嵌套的属性。
    // 不过为了让你明白这个函数做了什么事情，我们自己实现一个 prop 看看：
    var prop = _.curry(function(property, object){
        debugger;
        return object[property];
    });

    //实际上这有点傻，仅仅是用 [] 来获取一个对象的属性而已。让我们利用这个函数获取图片的 src。

    debugger;

    var mediaUrl = _.compose(prop('src'), prop('media'));

    var srcs = _.compose(_.map(mediaUrl), prop('items'));

    var images = _.compose(_.map(img), srcs);

    //渲染图片
    var renderImages = _.compose(Impure.setHtml("body"), images);

    //发起http 请求 ， 传回调函数
    var app = _.compose(Impure.getJSON(renderImages), url);

    app("flickr");



});

