/**
 * Created by mac on 16/7/4.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signup =  function (req, res) {
    var _user = req.body.user;
    User.findOne({name: _user.name } , function (err, user) {
        if(err){
            console.log(err)
        }

        //如果存在用户 ， 重定向到首页
        if(user){
            return res.redirect('/');
        }else{
            //否则保存用户
            user = new User(_user);
            user.save(function (err, user) {
                if(err){
                    console.log(err)
                }
                console.log('注册成功')
                res.redirect('/admin/userlist'); //重定向
                console.log(user)
            })
        }
    });

};

exports.showSignup =  function (req, res) {
    res.render('signup',{
        title : "注册",
    });
}

exports.showSignin =  function (req, res) {
    res.render('signin',{
        title : "登录",
    });
}

exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;


    User.findOne({name: name } , function (err, user) {
        if(err){
            console.log(err)
        }

        //如果不存在用户 , 重定向
        if (!user) {
            return res.redirect('/signup')
        }

        console.log(user)
        //检测一个密码
        user.comparePassword(password, function (err , isMatch) {
            if (err) {
                console.log(err)
            }
            //isMatch 是一个布尔值
            console.log(isMatch)
            if (isMatch) {
                req.session.user = user;

                console.log('登录成功')

                return res.redirect('/')
            }else{
                return res.redirect('/signin')
            }
        })
    });
}

exports.logout = function(req, res) {
    //删掉 session 的user 对象
    delete req.session.user;
    console.log('退出登录成功')
    res.redirect('/')
}


exports.userlist = function (req, res) {
    //模型下的fetch 方法 ， 查找数据库所有数据
    User.fetch(function(err, users) {
        if (err) {
            console.log(err)
        }

        res.render('userlist', {
            title: 'imooc 用户列表页',
            users: users
        })
    })

}

// 检测是否登录
exports.signinRequired = function(req, res, next) {
    var _user = req.session.user;
    if(!_user){
        return res.redirect('/signin')
    }

    next();
};

exports.adminRequired = function(req, res, next) {
    var _user = req.session.user;
    if(_user.role <= 10){
        return res.redirect('/signin')
    }

    next();
}