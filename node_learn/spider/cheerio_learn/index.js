/**
 * Created by mac on 16/6/30.
 */
//cheerio 是一个为服务器特别定制的，快速、灵活、封装jQuery核心功能工具包。Cheerio包括了 jQuery核心的子集，从jQuery库中去除了所有DOM不一致性和浏览器不兼容的部分，揭示了它真正优雅的API。Cheerio工作在一个非常简 单，一致的DOM模型之上，解析、操作、渲染都变得难以置信的高效。基础的端到端的基准测试显示Cheerio大约比JSDOM快八倍(8x)。 Cheerio封装了@FB55兼容的htmlparser，几乎能够解析任何的 HTML 和 XML document。
var cheerio = require("cheerio");
//curl js引入了http服务器
var curl = require('./lib/curl');

//要爬的网站
var url = "http://open.163.com/special/opencourse/englishs1.html";


curl(url, function(data) {
    if (data) {
        //爬回来的数据
        //console.log(data);

        //利用 cheerio 选择 dom ，
        var $ = cheerio.load(data);
        $("a.downbtn").each(function(i, e) {
            //爬一个 dom 元素 的 data-mid 属性
            console.log($(e).attr("data-mid"));
        });

        console.log("done");
    } else {
        console.log("error");
    }
});