/**
 * Created by mac on 16/6/30.
 */

var Layer = require('./layer');

    //创建Route类，定义三个成员变量和三个方法。path代表该route所对应的URI，stack代表上图中route内部item所在的数组，methods用来快速判断该route中是是否存在某种HTTP请求方法。
var Route = function (path) {
    this.path = Route;
    this.stack = [];
    this.methods = {};
};


Route.prototype._handles_method = function (method) {
    var name = method.toLowerCase();
    return Boolean(this.methods[name]);
};

Route.prototype.get = function(fn) {
    var layer = new Layer('/', fn);
    layer.method = 'get';

    this.methods['get'] = true;
    this.stack.push(layer);

    return this;
};


Route.prototype.dispatch = function(req, res, done) {
    var self = this,
        method = req.method.toLowerCase(),
        i = 0, len = self.stack.length, stack;

    /*for(var i=0,len=self.stack.length; i<len; i++) {
        if(method === self.stack[i].method) {
            return self.stack[i].handle_request(req, res);
        }
    }*/

    function next(gt) {
        if(gt == 'route'){
            return done();
        }

        if(i >= len) {
            return done();
        }

        stack = self.stack[i++];

        if(method === stack.method) {
            return stack.handle_request(req, res, next);
        }else{
            next();
        }
    }

    next();

};

/**
 * Module exports.
 * @public
 */

module.exports = Route;