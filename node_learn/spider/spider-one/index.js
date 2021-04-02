/**
 * Created by chenxingyu on 2016/12/14.
 */


var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var url = require('url');

var express = require('express');
var app = express();

var eventproxy = require('eventproxy');
var ep = eventproxy();

var baseUrl = 'http://blog.csdn.net/web/index.html';
var pageUrls = [];
for (var _i = 1; _i < 4; _i++) {
    pageUrls.push(baseUrl + '?&page=' + _i);
}

app.get('/', function (req, res, next) {
    var authorUrls = [];
    // 命令 ep 重复监听 emit事件(get_topic_html) 3 次再行动
    ep.after('get_topic_html', pageUrls.length, function (eps) {
        var concurrencyCount = 0;
        // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
        var fetchUrl = function (myurl, callback) {
            var fetchStart = new Date().getTime();
            concurrencyCount++;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', myurl);
            superagent.get(myurl)
                .end(function (err, ssres) {
                    if (err) {
                        callback(err, myurl + ' error happened!');
                    }

                    var time = new Date().getTime() - fetchStart;
                    console.log('抓取 ' + myurl + ' 成功', '，耗时' + time + '毫秒');
                    concurrencyCount--;

                    var $ = cheerio.load(ssres.text);
                    var result = {
                        userId: url.parse(myurl).pathname.substring(1),
                        blogTitle: $("#blog_title a").text(),
                        visitCount: parseInt($('#blog_rank>li').eq(0).text().split(/[:：]/)[1]),
                        score: parseInt($('#blog_rank>li').eq(1).text().split(/[:：]/)[1]),
                        oriCount: parseInt($('#blog_statistics>li').eq(0).text().split(/[:：]/)[1]),
                        copyCount: parseInt($('#blog_statistics>li').eq(1).text().split(/[:：]/)[1]),
                        trsCount: parseInt($('#blog_statistics>li').eq(2).text().split(/[:：]/)[1]),
                        cmtCount: parseInt($('#blog_statistics>li').eq(3).text().split(/[:：]/)[1])
                    };
                    callback(null, result);
                });

        };
        // 控制最大并发数为5，在结果中取出callback返回来的整个结果数组。
        async.mapLimit(authorUrls, 5, function (myurl, callback) {
            fetchUrl(myurl, callback);
        }, function (err, result) {
            console.log('=========== result: ===========\n', result);
            res.send(result);
        });
    });

    // 获取每页的链接数组，这里不要用emit返回了，因为我们获得的已经是一个数组了。
    pageUrls.forEach(function (page) {
        superagent.get(page).end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // 提取作者博客链接，注意去重
            var $ = cheerio.load(sres.text);
            $('.blog_list').each(function (i, e) {
                var u = $('.user_name', e).attr('href');
                if (authorUrls.indexOf(u) === -1) {
                    authorUrls.push(u);
                }
            });
            console.log('get authorUrls successful!\n', authorUrls);
            ep.emit('get_topic_html', 'get authorUrls successful');
        });
    });
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});