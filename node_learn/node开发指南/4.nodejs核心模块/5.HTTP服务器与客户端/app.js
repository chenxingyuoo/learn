/**
 * Created by chenxingyu on 2016/12/15.
 */
//Node.js 标准库提供了 http 模块，其中 装了一个高 的 HTTP 服务器和一个简易的 HTTP  客户端。
// http.Server 是一个基于事件的 HTTP 服务器，它的核心由 Node.js 下层 C++ 部分实现，
// 而接口由 JavaScript 封装，兼 了高性能与简易性。
// http.request 则是一个 HTTP   客户端工具，用于  HTTP 服务器发 请求，例如实现 Pingback1或者内容抓取。

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}).listen(3001);
console.log("HTTP server is listening at port 3000.");

//这段代码中，http.createServer 创建了一个 http.Server 的实例，将一个函数 作为 HTTP 请求处理函数。
// 这个函数接受两个参数，分别是请求对象( req )和 应对象 ( res )。在函数体内，res 显式地写回了 应代码 200 (表示请求成功)，
// 指定 应 为 'Content-Type': 'text/html'， 后写入 应体 '<h1>Node.js</h1>'，通过 res.end
// 结 并发 。最后该实例还调用了 listen 函数， 动服务器并 听 3000 端口。


/**
 * http.Server 的事件
 **/

//http.Server 是一个基于事件的 HTTP 服务器，所有的请求都被 装为  的事件， 开发者只需要对它的事件编写 应函数 可实现 HTTP 服务器的所有功能。
// 它继 自 EventEmitter，提供了以下几个事件。

// request:   端请求到来时，该事件被触发，提供两个参数 req 和res，分别是 http.ServerRequest和http.ServerResponse 的实例，表示请求和 应  。
// connection:  TCP  接建 时，该事件被触发，提供一个参数 socket，为 net.Socket 的实例。
// connection 事件的  要大于 request，因为  端在 Keep-Alive 模式下可能会在同一个 接内发 多次请求。
// close : 服务器关闭时，该事件被触发。注意不是在用  接 开时。

//除此之外还有 checkContinue、upgrade、clientError 事件，通常我们不需要关 心，只有在实现复杂的 HTTP 服务器的时  会用到。


//在这些事件中，最常用的就是 request 了，因此 http 提供了一个  : http.createServer([requestListener])，
// 功能是创建一个 HTTP 服务器并将 requestListener 作为 request 事件的 听函数，这也是我们前面例 中使用的方法。
// 事实上它显式的实现方法是:

var server = new http.Server();
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
});
server.listen(3002);
console.log("HTTP server is listening at port 3000.");


/**
 * http.ServerRequest HTTP 请求的
 **/

// http.ServerRequest 是 HTTP 请求的  ，是后端开发者最关注的内容。它一 由
// http.Server 的 request 事件发 ，作为第一个参数传递，通常简  request 或 req。 ServerRequest 提供一些特性，

//HTTP 请求一 可以分为两部分:   (Request Header)和   (Requset Body)。 以上内容由于    都可以在请求 解析完成后  读取。
// 而请求体可能 对  ， 需要一定的时间传输，因此 http.ServerRequest 提供了以下3个事件用于控制请求体 传输。

//data : 请求体数据到来时，该事件被触发。该事件提供一个参数 chunk，表示接  到的数据。如果该事件没有被 听，那么请求体将会被  。该事件可能会被调 用多次。
//end : 请求体数据传输完成时，该事件被触发，此后将不会 有数据到来。
//close: 用  前请求结 时，该事件被触发。不同于 end，如果用 强制终 了传输，也还是调用close。

//ServerRequest 的 性

// complete     端请求是 已经发 完成
// httpVersion  HTTP  议版本，通常是 1.0 或 1.1
// method       HTTP 请求方法，如 GET、POST、PUT、DELETE 等
// url          原始的请求路 ，例如 /static/image/x.jpg 或 /user?name=byvoid HTTP 请求
// headers      HTTP 请求头
// trailers     HTTP 请求尾 (不常见)
// connection   当前 HTTP  接 接字，为 net.Socket 的实例
// socket       connection  属性的别
// client       client  属性的别

/**
 * 获取GET请求内容
 **/

//注意，http.ServerRequest 提供的 性中没有  于 PHP 语言中的 $_GET 或 $_POST 的 性，那我们如何接受  端的表 请求
// 由于 GET 请求 接被 入在路  中，URL是完 的请求路 ，包括了 ? 后面的部分，
// 因此你可以 动解析后面的内容作为 GET 请求的参数。Node.js 的 url 模块中的 parse 函数提供了这个功能，例如:

var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3003);

//通过 url.parse原始的 path 被解析为一个对象，其中 query 就是我们所 的 GET 请求的内容，而路由则是 pathname。


//在浏览器中访问 http://127.0.0.1:3002/user?name=byvoid&email=byvoid@byvoid.com，我
// 们可以看到浏览器 回的结果:

//Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?name=byvoid&email=byvoid@byvoid.com',
//     query: { name: 'byvoid', email: 'byvoid@byvoid.com' },
//     pathname: '/user',
//     path: '/user?name=byvoid&email=byvoid@byvoid.com',
//     href: '/user?name=byvoid&email=byvoid@byvoid.com'
// }


/**
 * 获取 POST 请求内容
 **/
//HTTP  议 1.1 版本提供了8种标准的请求方法，其中最常见的就是 GET 和 POST。
// 比 GET 请求 所有的内容编码到访问路 中，POST 请求的内容全部都在请求体中。
// http.ServerRequest 并没有一个 性内容为请求体， 因是等 请求体传输可能是一件  时的工作，
// 如上传文件。而很多时 我们可能并不需要理会请求体的内容， 意的 POST 请求会大大  服务器的资源。
// 所以 Node.js  认是不会解析请求体的， 当你需要的时 ， 需要手动来做。让我们看看实现方法:


var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function (req, res) {
    var post = '';
    req.on('data', function (chunk) {
        post += chunk;
    });
    req.on('end', function () {
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3004);


//上面代码并没有在请求 应函数中   端 回  ，而是定 了一个 post 变量，用 于在闭包中 存请求体的  。
// 通过 req 的 data 事件 听函数，每 接受到请求体的数据， 就 加到 post 变量中。
// 在 end 事件触发后，通过 querystring.parse 将 post 解析为 真正的 POST 请求格式， 后   端 回。


/**
 * http.ServerResponse
 * */

//http.ServerResponse 是返回给客户端的  ，决定了用户最终能看到的结果。它
// 也是由 http.Server 的 request 事件发送的，作为第 个参数传递，一 简 为 response 或 res。

//http.ServerResponse 有 个重要的成员函数，用于 回 应 、 应内容以及结束请求。

// response.writeHead(statusCode, [headers]): 请求的  端发  应 。 statusCode 是 HTTP   码，如 200 (请求成功)、404 ( 找到)等。
// headers 是一个  关联数 的对象，表示 应 的每个 性。该函数在一个请求内最多只 能调用一次，如果不调用，则会自动生成一个 应 。
// response.write(data, [encoding]): 请求的  端发  应内容。data 是 一个 Buffer 或字符 ，表示要发 的内容。
// 如果 data 是字符 ，那么需要指定 encoding 来说 它的编码方式， 认是 utf-8。在 response.end 调用之前， response.write 可以被多次调用。
// response.end([data], [encoding]):结  应，告知  端所有发 已经完 成。 所有要 回的内容发 完 的时 ，该函数    被调用一次。
// 它接受两个可  参数，意 和 response.write  同。如果不调用该函数，  端将永 处于 等   。


/**
 *  HTTP客户端
 *
 **/

//http 模块提供了两个函数 http.request 和 http.get，功能是作为客户端  HTTP 服务器发起请求。

//http.request(options, callback) 发  HTTP 请求。接受两个参数，option 是 一个  关联数 的对象，表示请求的参数，callback 是请求的回调函数。option 常用的参数如下所示。
// host :请求网站的域 或 IP 地址。
// port :请求网站的端口， 认 80。
// method :请求方法， 认是 GET。
// path:请求的 对于 的路 ， 认是 / 。QueryString 应该包 在其中。
// 例如 /search?query=byvoid。
// headers:一个关联数 对象，为请求 的内容。
// callback 传递一个参数，为http.ClientResponse的实例。 http.request  回一个http.ClientRequest的实例。

//下面是一个通过 http.request 发  POST 请求的代码:

var http = require('http');
var querystring = require('querystring');
var contents = querystring.stringify({
    name: 'byvoid',
    email: 'byvoid@byvoid.com',
    address: 'Zijing 2#, Tsinghua University',
});
var options = {
    host: 'www.byvoid.com',
    path: '/application/node/post.php', method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': contents.length
    }
};
var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});
req.write(contents);
req.end();


// http.get(options, callback) http 模块还提供了一个更加简便的方法用于处 理GET请求:http.get。
// 它是 http.request 的简化版， 一的区别在于http.get 自动将请求方法设为了 GET 请求，同时不需要 动调用 req.end()。

var http = require('http');
http.get({host: 'www.byvoid.com'}, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});

/**
 * http.ClientRequest
 *
 **/

// http.ClientRequest 是由 http.request 或 http.get  回产生的对象，表示一
// 个已经产生而且正在进行中的 HTTP 请求。它提供一个 response 事件，  http.request 或 http.get
// 第2个参数指定的回调函数的 定对象。我们也可以显式地 定这个事件的  听函数:

var http = require('http');
var req = http.get({host: 'www.byvoid.com'});
req.on('response', function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
    });
});


// http.ClientRequest   http.ServerResponse 一 也提供了 write 和 end 函 数，用于 服务器发 请求体，
// 通常用于 POST、PUT 等操作。所有写结 以后  调用 end 函数以通知服务器， 则请求无 。http.ClientRequest 还提供了以下函数。

// request.abort():终止正在发送的请求。
// request.setTimeout(timeout, [callback]):设置请求超时时间，timeout 为毫秒
// 数。 请求超时以后，callback 将会被调用。

//此外还有request.setNoDelay([noDelay])、request.setSocketKeepAlive
// ([enable], [initialDelay]) 等函数，具体内容请参见 Node.js 文档。


/**
 * http.ClientResponse
 *
 **/

// http.ClientResponse 与 http.ServerRequest   ，提供了 个事件 data、end
// 和 close，分别在数据到达、传输结 和 接结 时触发，其中 data 事件传递一个参数 chunk，表示接 到的数据。

//http.ClientResponse 也提供了一些 性，用于表示请求的结果  ，参见表 4-3。 2

// statusCode     //HTTP   码，如 200、404、500
// httpVersion    //HTTP  议版本，通常是 1.0 或 1.1
// headers        //HTTP 请求头
// trailers       //HTTP 请求尾 (不常见)


//http.ClientResponse 还提供了以下几个特 的函数。

// response.setEncoding([encoding]):设置 认的编码，  data 事件被触发
// 时，数据将会以 encoding 编码。 认值是 null， 不编码，以 Buffer 的形式存 。常用编码为 utf8。
// response.pause():  接 数据和发 事件，方便实现下载功能。
// response.resume():从  的  中 复。






