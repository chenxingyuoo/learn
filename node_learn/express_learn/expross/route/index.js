/**
 * Created by mac on 16/6/30.
 */

var Layer = require('./layer');
var Route = require('./route');


var Router = function () {
    this.stack =  [
        new Layer('*', function(req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Cannot ' + req.method + ' ' + req.url);
        })
    ];
};


//表示增加一个路由(工厂方法)
/*Router.prototype.use = function(path, cb) {
    /!*this.router.push({
     path : path,
     fn : cb
     })*!/
    this.router.push( new Layer(path, cb) );
};*/


Router.prototype.handle = function(req, res) {
    var self = this,
        method = req.method,
        i = 1, len = self.stack.length,
        stack;

    /*for(var i=0,len=self.stack.length; i<len; i++) {
        if(self.stack[i].match(req.url) &&  self.stack[i].route && self.stack[i].route._handles_method(method)) {
            //把 req, res 对象传过去。
            return self.stack[i].handle_request(req, res);
        }
    }
    //把 req, res 对象传过去。
    return self.stack[0].handle_request(req, res);*/
    function next() {
        if(i >= len) {
            return self.stack[0].handle_request(req, res);
        }

        stack = self.stack[i++];

        if(stack.match(req.url) && stack.route
            && stack.route._handles_method(method)) {
            return stack.handle_request(req, res, next);
        } else {
            next();
        }
    }

    next();

};

Router.prototype.get = function(path, fn) {
    var route = this.route(path);

    route.get(fn);

    return this;
};

Router.prototype.route = function (path) {
    var route = new Route(path);

    var layer = new Layer(path, function(req, res, next) {
        route.dispatch(req, res, next)
    });

    layer.route = route;

    this.stack.push(layer);

    return route;
};

/**
 * Module exports.
 * @public
 */

module.exports = Router;