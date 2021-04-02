/**
 * Created by mac on 16/6/30.
 */
var http = require('http');
var router = require('../route');

//一个简单的http服务就创建完成了，你可以在命令行中启动它，而expross框架的搭建就从这个文件出发。


//1.1 第一划 Application
//在实际开发过程中，web后台框架的两个核心点就是路由和模板。路由说白了就是一组URL的管理，根据前端访问的URL执行对应的处理函数。怎样管理一组URL和其对应的执行函数呢？首先想到的就是数组（其实我想到的是对象）。

//创建一个名称叫做router的数组对象。
//路由
/*var router = [];
router.push({path: '*', fn: function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('404');
}}, { path: '/', fn: function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}});


http.createServer(function(req, res) {
    /!* res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello World');*!/

    console.log(req, res)

    //自动匹配
    for(var i = 1, len = router.length; i < len; i++) {
        if(req.url === router[i].path) {
            //把 req, res 对象传过去。
            return router[i].fn(req, res);
        }
    }
    //把 req, res 对象传过去。
    return router[0].fn(req, res);

}).listen(3000, function () {
    console.log('Listening at http://localhost:3000')
});*/

//router数组用来管理所有的路由，数组的每个对象有两个属性组成，path表示路径，fn表示路径对应的执行函数。一切看起来都很不错，但是这并不是一个框架，为了组成一个框架，并且贴近express，这里继续对上面的代码进一步封装。

//首先定义一个类：Application
var Application = function() {
    //初始一个路由
    /*this.router = [{
        path: '*',
        fn: function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Cannot ' + req.method + ' ' + req.url);
        }
    }];*/
    this._router = new router();

};


Application.prototype.get = function (path, fn) {
    var router = this._router;
    return router.get(path, fn);
};

Application.prototype.route = function (path) {
    return this._router.route(path);
};


Application.prototype.handle = function (req, res) {
    var router = this._router;
    return router.handle(req, res);
};


//监听http服务器
Application.prototype.listen = function(port, func) {
    var self = this;

    //创建一个http服务器
    http.createServer(function(req, res) {
        self.handle(req, res);
    }).listen(port, func)
};

//暴露方法
module.exports = Application;

//把上面的实现，封装到这个类中。use 函数表示增加一个路由(工厂方法)，listen 函数表示监听http服务器。

/*var app = new Application();
app.use('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Worlds');
});
app.listen(3000,console.log('listen at : http://localhost:3000'));*/



























