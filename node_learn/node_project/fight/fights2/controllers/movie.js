/**
 * Created by mac on 16/7/5.
 */

var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var Comment = mongoose.model('Comment');

//电影编辑页
exports.movieEdit = function (req, res) {
    res.render('movie_edit', {
        title: "电影录入页",
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
};

//电影编辑提交 ， 保存电影
exports.movieSave = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;  //req.body拿表单用post请求到后台的movie对象
    var _movie;

    //如果有id 说明是更新 ， 否则添加一条数据保存
    if(id){
        //找到该id的电影
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }

            //深拷贝
            function extend(target, source) {//target 旧的 source新的
                for (var i in source) {
                    target[i] = source[i];
                }
                return target;
            }

            //深拷贝 , movie是找到的这条电影数据(也就是旧的，存在数据库) ， movieObj是表单提交来新的数据
            _movie = extend(movie, movieObj);

            //保存数据库
            _movie.save(function (err, movie) {
                //回调函数可拿到是否异常，save后的 movie
                if (err) {
                    console.log(err);
                }
                //跳转到电影详情页的路由 /admin/movie/detail/:id
                res.redirect('/admin/movie/detail/' + movie._id );
            })

        });
    }else{
        //新增一条数据，存到数据库
        _movie = new Movie(movieObj);

        //调用 _movie 的save 方法， 保存数据库
        _movie.save(function(err,movie) {
            console.log(movie)

            //回调函数可拿到是否异常，save后的 movie
            if (err) {
                console.log(err);
            }

            //跳转到电影详情页的路由 /admin/movie/detail/:id
            res.redirect('/admin/movie/detail/' + movie._id );

        });
    }

};

//电影详情
exports.movieDetail = function (req, res) {
    var id = req.params.id;

    //找到该id的电影
    Movie.findById(id, function (err, movie) {
        //console.log(movie);

        if(err){
            console.log(err);
        }

        Comment.find({movie: id})
            .populate('from', 'name')  //关联查询用户的名字
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                //console.log(comments)
                if(err){
                    console.log(err);
                }

                res.render('movie_detail',{
                    title : '电影详情页',
                    movie : movie,
                    comments : comments
                })
        });

    });
};

//电影列表
exports.movieList = function (req, res) {
    //查找所有的电影
    Movie.fetch(function (err, movie) {
        if(err){
            console.log(err);
        }

        res.render('movie_list',{
            title : '电影列表',
            movie : movie
        })
    });
};

//电影删除
exports.movieDelete = function (req, res) {
    var id = req.query.id;

    //删除这个id的电影
    Movie.remove({_id : id}, function (err, movie) {
        if (err) {
            console.log(err)
        } else {
            //给客户端返回一段数据
            res.json({success: 1})
        }
    });
};

//电影更新
exports.movieUpdate = function (req, res) {
    var id = req.params.id;

    //找到该电影
    Movie.findById(id , function (err, movie) {
        res.render('movie_edit',{
            title : '电影录入页',
            movie : movie
        })
    })
};
