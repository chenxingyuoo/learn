/**
 * Created by mac on 16/6/30.
 */
//创建一个叫做layer的类，并为该类添加两个方法，handle_request和match。match用来匹配请求路径是否符合该层，handle_request用来执行路径对应的处理函数。

/**
 * Module exports.
 * @public
 */

module.exports = Layer;

function Layer(path, fn) {
    this.handle = fn;
    this.name = fn.name || '<anonymous>';
    this.path = path;
}

//简单处理
Layer.prototype.handle_request = function (req, res , next) {
    var fn = this.handle;

    if(fn) {
        fn(req, res, next);
    }
};

//简单匹配
Layer.prototype.match = function (path) {
    if(path === this.path) {
        return true;
    }

    return false;
};