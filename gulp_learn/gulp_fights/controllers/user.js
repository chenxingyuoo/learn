/**
 * Created by mac on 16/7/5.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

//用户登录页面
exports.showSignin = function (req, res) {
    res.render('signin',{
        title : '登录'
    })
};

//用户注册页面
exports.showSignup = function (req, res) {
    res.render('signup',{
        title : '注册'
    })
};

//用户注册
exports.userSignup = function (req, res) {
    //拿到表单提交的 user对象
    var _user = req.body.user;

    //从数据库中找这个用户 ， 利用用户名匹配。
    User.findOne({name: _user.name }, function (err, user) {

        //如果存在用户 ， 更新用户信息
        if(user){
            //深拷贝
            function extend(target, source) {//target 旧的 source新的
                for (var i in source) {
                    //判断密码是否为空 ， 是的话就不替换。
                    if(i == 'password' && source[i].replace(/\s/g,'') == '') return '';
                    target[i] = source[i];
                }
                return target;
            }

            var newUserObj = extend(user , _user);

            //密码没有填写就不保存 ？
            if(newUserObj){
                newUserObj.save(function (err, new_user) {
                    if(err){
                        console.log(err);
                    }
                    console.log('修改用户信息成功');
                })
            }

            res.redirect('/admin/user/list');

        }else{
            user = new User(_user);
            //保存到数据库
            user.save(function (err,user) {
                if(err){
                    console.log(err);
                }
                console.log('注册成功');
                //跳转到登录页面
                res.redirect('/signin');
            })
        }
    });
};


//用户登录
exports.userSignin = function (req, res) {
    //拿到表单提交的 user对象
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    var curUrl = req.url;

    //从数据库中找这个用户 ， 利用用户名匹配。
    User.findOne({name: name }, function (err, user) {
        //如果不存在用户
        if(!user){
            return res.redirect('/');
        }
        console.log(user);

        //检测一个密码
        user.comparePassword(password, function (err, isMatch) {
            if(err){
                console.log(err);
            }

            console.log(isMatch)

            //检测的密码为true
            if (isMatch) {
                req.session.user = user;
                console.log('登录成功');
                return res.redirect('/');
            }else{
                return res.redirect('/signin');
            }
        })
    })
};


//退出登录
exports.userLogout = function (req, res) {
    req.session.user = null;
    res.redirect('/');
};

//用户列表
exports.userList = function (req, res) {
    User.fetch(function (err, users) {
        if(err){
            console.log(err);
        }

        res.render('user_list',{
            title : '用户列表',
            users : users
        })
    })
};

//用户删除
exports.userDelete = function (req, res) {
    var id = req.query.id;
    var curUserId = req.session.user._id;
    User.remove({_id : id} , function (err, user) {
        if(err){
            console.log(err);
        }else{

            var data = {
                success: 1,
                msg : '删除成功'
            };

            //如果删除的用户是当前的这个用户 ， 清除session
            if(id == curUserId){
                console.log('del-session');
                req.session.user = null;
                // 告诉客户端删除的是当前登录的用户 , 让浏览器刷新页面
                data.isCurDel = true;
            }

            //给客户端返回一段数据
            res.json(data);


        }

    })
};

//用户资料更新
exports.userUpdate = function (req, res) {
   var id = req.params.id;
   User.findById(id , function (err, user) {
       res.render('user_eait',{
           title : '资料修改',
           user : user
       })
   })
};


// 检测是否登录
exports.signinRequired = function(req, res, next) {
    var _user = req.session.user;
    if(!_user){
       return res.redirect('/signin');
    }
    next();
};

//检测用户权限
exports.adminRequired = function(req, res, next) {
    var _user = req.session.user;
    //权限 > 10 的就可以编辑后台 ， < 10 是普通用户。
    if(_user.role <= 10){
        return res.redirect('/');
    }
    next();
};
