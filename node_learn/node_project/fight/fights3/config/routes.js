/**
 * Created by mac on 16/7/5.
 * User.signinRequired 这个方法检测是否登录
 * User.adminRequired 检测是否拥有管理员权限
 */
var Index = require('../controllers/index');  // 首页控制器
var Movie = require('../controllers/movie'); //电影控制器
var User = require('../controllers/user');  //用户控制器
var Comment = require('../controllers/comment');  //评论控制器
var Category = require('../controllers/category');  //评论控制器


module.exports = function (app) {

    //
    app.use(function (req, res, next) {
        //获取session 的 user
        var _user_ = req.session.user;
        //赋值给  app.locals , 这样 jade模板就能直接访问这个user对象 ， 就可以渲染用户数据
        app.locals.user = _user_;
        //执行下一步
        next();
    });

    //index page 首页
    app.get('/', Index.index);

    //电影编辑页
    app.get('/admin/movie/edit', User.signinRequired,   Movie.movieEdit);

    //保存，新建一个电影
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.savePoster, Movie.movieSave);

    //电影详情
    app.get('/admin/movie/detail/:id', Movie.movieDetail);

    //电影列表
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.movieList);

    //电影删除
    app.delete('/admin/movie/del', User.signinRequired, User.adminRequired, Movie.movieDelete);

    //电影更新
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.movieUpdate);


    //用户

    //用户注册
    app.post('/user/signup', User.userSignup);

    //用户登录
    app.post('/user/signin', User.userSignin);

    //用户退出登录
    app.get('/user/logout', User.userLogout);

    //用户登录页面
    app.get('/signin', User.showSignin);

    //用户注册页面
    app.get('/signup', User.showSignup);

    //用户列表
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.userList);

    //用户删除
    app.delete('/admin/user/del', User.signinRequired, User.adminRequired, User.userDelete);

    //用户资料更新
    app.get('/admin/user/update/:id', User.signinRequired, User.adminRequired, User.userUpdate);


    //电影分类页面
    app.get('/admin/movie/category', User.signinRequired, User.adminRequired , Category.categoryEdit );
    //电影分类新建
    app.post('/admin/movie_category/new', User.signinRequired, User.adminRequired , Category.movieCategorySave);
    //电影分类列表
    app.get('/admin/movie_category/list', User.signinRequired, User.adminRequired , Category.movieCategoryList);
    //电影分类更新
    app.get('/admin/movie_category/update/:id', User.signinRequired, User.adminRequired , Category.movieCategoryUpdate);
    //电影分类删除
    app.delete('/admin/movie_category/del', User.signinRequired, User.adminRequired , Category.movieCategoryDelete);


    //用户评论电影
    app.post('/user/comment', User.signinRequired, Comment.userComment );
};


