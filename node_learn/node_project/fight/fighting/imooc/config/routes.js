/**
 * Created by mac on 16/7/4.
 */
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');




//导出模块
module.exports = function(app) {

    // pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user

        app.locals.user = _user

        next()
    });

    //index page 首页
    app.get('/',Index.index);

    /*app.get('/', function (req, res) {
        //模型下的fetch 方法 ， 查找数据库所有数据
        Movie.fetch(function(err,movies){
            if(err){
                console.log("err is" + err)
            }

            res.render('index',{
                title : "imooc 首页",
                movies : movies
            });
        })
    });*/


    app.post('/user/signup',User.signup);
    //注册
    /*app.post('/user/signup', function (req, res) {
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

    });*/

    //登录页面
    app.get('/signup',User.showSignup);
    /*app.get('/signup', function (req, res) {
        res.render('signup',{
            title : "注册",
        });
    });*/

    //登录页面
    app.get('/signin',User.showSignin);
    /*app.get('/signin', function (req, res) {
        res.render('signin',{
            title : "登录",
        });
    });*/

    //登录
    app.post('/user/signin',User.signin);
   /* app.post('/user/signin', function (req, res) {
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
            //
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
    });*/

    //退出登录
    app.get ('/logout',User.logout);
    /*app.get ('/logout',function(req, res) {
        //删掉 session 的user 对象
        delete req.session.user;
        console.log('退出登录成功')
        res.redirect('/')
    });*/


    //detail page电影详情页
    app.get('/movie/:id',Movie.movieDetail);
    /*app.get('/movie/:id', function (req, res) {
        // :id 是url /movie/值 后面的值 ， 通过req.params.id 获取这个值
        var id = req.params.id; //req.params 拿express路由器传递的参数
        if(id){
            //模型下的findById 方法 ， 通过id查找单条数据
            Movie.findById(id , function(err , movie){
                //调用res.render
                res.render('detail',{
                    title : "imooc " + movie.title,
                    movie:movie
                });
            })
        }
    });*/


    //admin page后台录入页
    app.get('/admin/movie/edit', User.signinRequired, User.adminRequired ,Movie.moveEdit);
    /*app.get('/admin/movie', function (req, res) {
        res.render('admin',{
            title : "imooc 后台录入页",
            movie : {
                title : '',
                doctor : '',
                country : '',
                year : '',
                poster : '',
                flash : '',
                summary : '',
                language : '',
            }
        });
    });*/



    //在列表页/admin/list 点击更新 会重新回到 后台录入页admin/movie
    //admin updata movie
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired ,Movie.movieUpdate);
   /* app.get('/admin/update/:id',function (req,res){
        // :id 是url /movie/值 后面的值 ， 通过req.params.id 获取这个值
        var id = req.params.id; //req.params 拿express路由器传递的参数
        if(id){
            Movie.findById(id,function (err,movie){
                //拿到id 也就是电影数据 ， 渲染表单，也就是后台录入页
                res.render('admin',{
                    title : "imooc 后台录入页",
                    movie : movie
                })
            })
        }

    });*/



    //后台录入页，表单提交过来后电影的存储 ，添加一个路由 ， post请求
    //admin post movie
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired ,Movie.movieSave);
    /*app.post('/admin/movie/new',function(req,res){
        //判断，post进来的数据可能是新加的 ， 可能更新过
        var id = req.body.movie._id; //req.body拿表单用post请求到后台 的_id
        var movieObj = req.body.movie; //req.body拿表单用post请求到后台的movie对象
        var _movie;

        if(id !== "undefined"){
            //说明这部电影已经存储到数据库过的，进行更新
            //找到这部电影
            Movie.findById( id ,function(err,movie){
                if(err){
                    console.log(err);
                }

                //用post 进来的电影数据或者更新的电影数据替换掉 已经老的 电影  underscore 的 extend
                _movie = _.extend(movie,movieObj) //查询后的参数1 movie ，拿视图有定义的movie对象参数2 movieObj

                //调用_movie的save 方法
                _movie.save(function(err,movie){
                    //回调函数可拿到是否异常，save后的 movie
                    if(err){
                        console.log(err);
                    }

                    //电影数据更新了并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面
                    res.redirect('/movie/' + movie._id)  //- 电影详情页的路由 movie/:id  ，redirect 的 地址要跟它对应
                })
            })
        }else{
            //id == ‘undefined’ ，否则这部电影是新加的
            //调用模型的构造函数
            _movie = new Movie({
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });

            //调用 _movie 的save 方法
            _movie.save(function(err,movie){
                //回调函数可拿到是否异常，save后的 movie
                if(err){
                    console.log(err);
                }

                //电影有新数据并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面
                res.redirect('/movie/' + movie._id)  //电影详情页的路由 movie/:id  ，redirect 的 地址要跟它对应
            })
        }
    });*/



    //list page 列表页
    app.get('/admin/movie/list',  User.signinRequired, User.adminRequired ,Movie.movieList)
    /*app.get('/admin/list', function (req, res) {
        //模型下的fetch 方法 ， 查找数据库所有数据
        Movie.fetch(function(err,movies){
            if(err){
                console.log("err is" + err)
            }
            res.render('list',{
                title : "imooc 列表页",
                movies:movies
            });
        })
    });*/


    //userlist page 列表页
    app.get('/admin/user/list', User.signinRequired, User.adminRequired ,User.userlist);
    /*app.get('/admin/userlist', function (req, res) {
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

    });*/


    //list delete movie  //列表页删除按钮的route
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired ,Movie.movieDel);
    /*app.delete('/admin/list',function (req,res){
        //id是url ？号 后面得值，通过query拿
        var id = req.query.id;  //req.query直接获取地址栏传递的参数

        if(id){
            Movie.remove({_id:id},function (err,movie){
                if(err){
                    console.log(err)
                }
                else{
                    //给客户端返回一段数据
                    res.json({success: 1})
                }
            })
        }
    });*/

    // Comment
    app.post('/user/comment', User.signinRequired, Comment.save)

}
