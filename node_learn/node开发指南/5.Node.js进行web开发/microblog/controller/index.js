/**
 * Created by chenxingyu on 2016/12/19.
 */
var crypto = require('crypto');
// crypto 是 Node.js 的一个核心模块，功能是加密并生成各种散列, 我们代码中使用它设计了密码的散列值。

//mongodb
var User = require('../models/User');
var Post = require('../models/Post');

// request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。
// response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。

var assignUser = function (req, object) {
    return Object.assign(object || {}, {
        session: req.session,
        message: req.session.message
    });
};


//首页
exports.index = function (req, res, next) {
    console.log(req.session,'23');
    throw new Error('An error for test purposes.');
    // user : req.session.user ? req.session.user.name : ''
    Post.find({}, function (err, posts) {

        if (err) {
            req.session.message = err.message;
            posts = [];
            res.redirect('/');
        } else {

            //传递给首页 ， 参数叫做 posts
            res.render('index', assignUser(req, {
                title: '首页',
                posts: posts.reverse()  //翻转数组
            }));
        }

    });
};


var getTime = function (date) {
    return date.getFullYear() +
        "-" + date.getMonth() + 1 + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes();
};

//发表微博
exports.post = function (req, res, next) {
    var currentUser = req.session.user;
    var post = new Post({
        user: currentUser.name,
        post: req.body.article,
        updated: getTime(new Date())
    });

    console.log(req);

    post.save(function (err) {
        if (err) {
            req.session.message = err.message;
            res.redirect('/reg');
        } else {
            req.session.message = "发表成功";
            res.redirect(req.headers.referer);
        }
    });
};


exports.user = function (req, res, next) {
    Post.find({user : req.session.user ? req.session.user.name : ''}, function (err, posts) {

        if (err) {
            req.session.message = err.message;
            posts = [];
            res.redirect('/');
        } else {

            //传递给首页 ， 参数叫做 posts
            res.render('user', assignUser(req, {
                title: '我的微博',
                posts: posts.reverse()  //翻转数组
            }));
        }

    });
};

//用户注册页面
exports.reg = function (req, res, next) {
    res.render('reg', assignUser(req, {
        title: '用户注册',
    }));
};

//注册请求
exports.doReg = function (req, res, next) {
    //判断两次密码是否一致
    req.session.message = '';
    if (req.body['passwordconf'] != req.body['password']) {
        req.session.message = "两次密码不一致";
        res.redirect('/reg');
    } else {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var newUser = new User({
            name: req.body['username'],
            password: password
        });

        User.findOne({name: newUser.name}, function (err, user) {
            if (user) {
                err = "用户名已经存在";
            }
            if (err) {
                req.session.message = err;
                res.redirect('/reg');
            } else {
                newUser.save(function (err) {
                    if (err) {
                        req.session.message = err.message;
                        res.redirect('/reg');
                    } else {
                        req.session.user = newUser;
                        req.session.success = "注册成功";
                        res.redirect('/login');
                    }
                });
            }
        });
    }
};


//用户登录页面
exports.login = function (req, res, next) {
    res.render('login', assignUser(req, {
        title: '用户登录',
    }));
};

//用户登录接口
exports.doLogin = function (req, res, next) {
    //生产口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.findOne({name: req.body.username}, function (err, user) {
        if (!user) {
            req.session.message = "用户不存在";
            res.redirect('/login');
        } else {
            if (user.password != password) {
                req.session.message = "密码错误";
                res.redirect('/login');
            } else {
                req.session.user = user;
                req.session.success = "登录成功";
                res.redirect('/');
            }
        }

    });
};

//退出登录
exports.logout = function (req, res, next) {
    req.session.user = null;
    req.session.message = null;
    req.session.success = null;
    res.redirect('/');
};


exports.checkLogin = function (req, res, next) {
    if (!req.session.user && req.session.success !== '登录成功') {
        res.redirect('/login');
    }
    next();
};


exports.checkNotLogin = function (req, res, next){
    if (req.session.user && req.session.success === '登录成功') {
        res.redirect('/');
    }
    next();
};