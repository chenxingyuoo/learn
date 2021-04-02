/**
 * Created by mac on 16/7/4.
 */
var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
var Category = mongoose.model('Category')
var Comment = mongoose.model('Comment')
var _ = require('underscore'); //需要安装模块 mpm install underscore


//电影详情
exports.movieDetail = function (req, res) {
    // :id 是url /movie/值 后面的值 ， 通过req.params.id 获取这个值
    var id = req.params.id; //req.params 拿express路由器传递的参数

   /* Movie.update({_id: id}, {$inc: {pv: 1}}, function (err) {
        if (err) {
            console.log(err)
        }
    });*/

    //模型下的findById 方法 ， 通过id查找单条数据
    Movie.findById(id, function (err, movie) {
        console.log(movie)
        Comment
            .find({movie: id})
            .populate('from', 'name') //关联查询用户的名字
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                console.log(comments)
                //调用res.render
                res.render('detail', {
                    title: "imooc " + movie.title,
                    movie: movie,
                    comments: comments
                });

            });
            /*.populate('from', 'name')
            .populate('reply.from reply.to', 'name')*/
            /*.exec()*/
    });
};

//电影更新
exports.movieUpdate = function (req, res) {
    // :id 是url /movie/值 后面的值 ， 通过req.params.id 获取这个值
    var id = req.params.id; //req.params 拿express路由器传递的参数

    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function(err, categories) {
                //拿到id 也就是电影数据 ， 渲染表单，也就是后台录入页
                res.render('admin', {
                    title: "imooc 后台录入页",
                    movie: movie ,
                    categories : categories
                })
            })
        })
    }
};

//电影列表
exports.movieList = function (req, res) {
    //模型下的fetch 方法 ， 查找数据库所有数据
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log("err is" + err)
        }
        res.render('list', {
            title: "imooc 列表页",
            movies: movies
        });
    })
};

//电影删除
exports.movieDel = function (req, res) {
    //id是url ？号 后面得值，通过query拿
    var id = req.query.id;  //req.query直接获取地址栏传递的参数

    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err)
            }
            else {
                //给客户端返回一段数据
                res.json({success: 1})
            }
        })
    }
};

//后台录入
exports.moveEdit = function (req, res) {
    /*res.render('admin',{
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
     });*/
    Category.find({}, function (err, categories) {

        res.render('admin', {
            title: 'imooc 后台录入页',
            categories: categories,
            movie: {}
        })
    })
};

exports.movieSave = function (req, res) {
    console.log(req.body)
    //判断，post进来的数据可能是新加的 ， 可能更新过
    var id = req.body.movie._id; //req.body拿表单用post请求到后台 的_id
    var movieObj = req.body.movie; //req.body拿表单用post请求到后台的movie对象
    var _movie;



    if (req.poster) {
        movieObj.poster = req.poster
    }

    if (id) {
        //说明这部电影已经存储到数据库过的，进行更新
        //找到这部电影
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }

            //用post 进来的电影数据或者更新的电影数据替换掉 已经老的 电影  underscore 的 extend
            _movie = _.extend(movie, movieObj) //查询后的参数1 movie ，拿视图有定义的movie对象参数2 movieObj

            //调用_movie的save 方法
            _movie.save(function (err, movie) {
                //回调函数可拿到是否异常，save后的 movie
                if (err) {
                    console.log(err);
                }

                //电影数据更新了并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面
                res.redirect('/movie/' + movie._id)  //- 电影详情页的路由 movie/:id  ，redirect 的 地址要跟它对应
            })
        })
    } else {
        //id == ‘undefined’ ，否则这部电影是新加的
        //调用模型的构造函数
        _movie = new Movie(movieObj);

        //分类id
        var categoryId = movieObj.category
        //分类名称
        var categoryName = movieObj.categoryName

        //调用 模型 的save 方法
        _movie.save(function (err, movie) {

            console.log(movie)

            //回调函数可拿到是否异常，save后的 movie
            if (err) {
                console.log(err);
            }

            //如果有分类id
            if (categoryId) {
                //从 Category 这个模型找到分类id
                Category.findById(categoryId, function (err, category) {
                    //电影分类队列
                    category.movies.push(movie._id);
                    //分类保存
                    category.save(function (err, category) {
                        res.redirect('/movie/' + movie._id)
                    })
                });
            } else if (categoryName) {
                //new 一个分类id 的实例
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });

                //分类保存
                category.save(function (err, category) {
                    //分类是当前选中的分类
                    movie.category = category._id
                    //电影保存
                    movie.save(function (err, movie) {
                        //电影有新数据并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面
                        res.redirect('/movie/' + movie._id)  //电影详情页的路由 movie/:id  ，redirect 的 地址要跟它对应
                    })
                })
            }


        })
    }
};