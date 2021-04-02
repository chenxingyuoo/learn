/*module.exports = function (app) {
 app.get('/', function (req, res) {
 res.render('index', {
 title: '首页'
 });
 });

 app.get('/reg', function (req, res) {
 res.render('reg', {
 title: '用户注册'
 });
 });

 };*/


var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var db = require('../db');
var User = require('../models/user');
var Post = require('../models/post');

//console.log(Post.find())
/* GET home page. */
/* GET home page. */
router.get('/', function (req, res, next) {
    // 从数据库 Post 这个集合找出所有数据
    //console.log(Post)
    Post.find({}, function (err, posts) {

        if (err) {
            req.session.message = err.message;
            return res.redirect('/');
        }

        //传递给首页 ， 参数叫做 posts
        res.render('index', {
            title: '首页',
            posts: posts
        });
    });

});


//发表微博
router.post('/post', function (req, res, next) {
    var currentUser = req.session.user;
    var post = new Post({
        user: currentUser.name,
        post: req.body.article,
        updated: getTime(new Date())
    });
    post.save(function (err) {
        if (err) {
            req.session.message = err.message;
            return res.redirect('/reg');
        }
        req.session.success = "发表成功";
        res.redirect('/users/' + currentUser.name);
    });

});


function getTime(date) {
    return date.getFullYear() +
        "-" + date.getMonth() + 1 + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes();
}


router.get('/reg', isLogin);
//用户进入注册页面
router.get('/reg', function (req, res) {
    res.render('reg', {title: "用户注册"});
});


router.post('/reg', isLogin);
//用户点击注册按钮
router.post('/reg', function (req, res) {
    if (req.body['password'] != req.body['passwordconf']) {
        req.session.error = "两次密码不一致";
        return res.redirect('/reg');
    }
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
            req.session.error = err;
            return res.redirect('/reg');
        }
        newUser.save(function (err) {
            if (err) {
                req.session.error = err.message;
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.session.success = "注册成功";
            res.redirect('/');
        });
    });
});


router.get('/login', isLogin);
router.get('/login', function (req, res) {
    res.render('login', {title: "用户登陆"});
});

router.post('/login', isLogin);
router.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.findOne({name: req.body.username}, function (err, user) {
        if (!user) {
            req.session.error = "用户不存在";
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.session.error = "密码错误";
            return res.redirect('/login');
        }
        req.session.user = user;
        req.session.success = "登录成功";
        res.redirect('/');
    });
});

router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});

function isLogin(req, res, next) {
    if (req.session.user) {
        //console.log('用户已登录')
        req.session.message = "用户已登录";
        return res.redirect('/');
    }
    next();
}

module.exports = router;


/*
 var express = require('express');
 var crypto = require('crypto');
 var router = express.Router();
 var db = require('../db');
 var User = require('../models/user');
 var Post = require('../models/post');


 /!* GET home page. *!/
 router.get('/', function(req, res, next) {
 // 从数据库 Post 这个集合找出所有数据
 Post.find({}, function (err, posts) {
 if (err) {
 req.session.message = err.message;
 return res.redirect('/');
 }

 //传递给首页 ， 参数叫做 posts
 res.render('index', {
 title : '首页',
 posts: posts
 });
 });
 });


 //注册页面
 router.get('/reg', isLogin);

 router.get('/reg', function(req, res, next) {
 res.render('reg', { title: '用户注册' });
 });

 router.post('/reg', isLogin);

 //注册页面表单提交
 router.post('/reg', function(req, res) {
 //检验用户两次输入的口令是否一致
 if (req.body['passwordconf'] != req.body['password']) {
 req.session.message = err.message;
 return res.redirect('/reg');
 }

 //生成口令的散列值
 var md5 = crypto.createHash('md5');
 var password = md5.update(req.body.password).digest('base64');

 var newUser = new User({
 name: req.body['username'],
 password: password,
 });

 //从数据库中找到这个用户
 User.findOne({name:newUser.name},function(err,user){
 //存在则不可再次创建
 if(user) {
 err = "用户名已经存在";
 }

 if(err){
 req.session.error=err;
 return  res.redirect('/reg');
 }
 //否则保存到数据库
 newUser.save(function(err){
 if(err){
 req.session.error=err.message;
 return  res.redirect('/reg');
 }
 //保存到 session
 req.session.user=newUser;
 req.session.success="注册成功";
 console.log('注册success');
 res.redirect('/'); //页面跳转
 });

 });

 });


 router.get('/login',isLogin);
 router.get('/login',function(req,res){
 res.render('login',{title:"用户登陆"});
 });

 router.post('/login',isLogin);
 //表单提交
 router.post('/login',function(req,res){
 var md5=crypto.createHash('md5');
 var password=md5.update(req.body.password).digest('base64');
 User.findOne({name:req.body.username},function(err,user){
 if(!user){
 req.session.error="用户不存在";
 return res.redirect('/login');
 }
 if(user.password!=password){
 req.session.error="密码错误";
 return  res.redirect('/login');
 }
 req.session.user=user;
 req.session.success="登录成功";
 res.redirect('/');
 });
 });


 //退出登录
 router.get('/logout',function(req,res){
 //清空 session
 req.session.user=null;
 res.redirect('/');
 });

 function isLogin(req,res,next){
 console.log(req.session.user)
 if(req.session.user){
 req.session.message="用户已登录";
 return res.redirect('/');
 }
 next();
 }

 /!*router.get('/hello',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 router.get('/list', function(req, res) {
 res.render('list', {
 title: 'List',
 items: [1991, 'byvoid', 'express', 'Node.js']
 });
 });

 router.get('/u/:user',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 router.post('/post',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 //get
 router.get('/reg',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 //post
 router.post('/reg',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 //get
 router.get('/login',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 //post
 router.post('/login',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });

 router.get('/logout',function(req, res) {
 res.send('The time is ' + new Date().toString());
 });*!/



 module.exports = router;
 */
