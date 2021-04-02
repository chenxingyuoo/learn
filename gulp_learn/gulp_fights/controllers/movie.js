/**
 * Created by mac on 16/7/5.
 */

var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var Comment = mongoose.model('Comment');
var fs = require('fs');
var path = require('path');

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


/*这些代码可以实现需要的功能，但是服务在发送文件数据之前需要缓存整个文件数据到内存，如果"filePath"文件很
大并且并发量很大的话，会浪费很多内存。因为用户需要等到整个文件缓存到内存才能接受的文件数据，这样导致
用户体验相当不好。不过还好 "(req, res)" 两个参数都是Stream，这样我们可以用fs.createReadStream()代替"fs.readFile()"。  fs.createReadStream(__dirname + '/vedio.mp4').pipe(res) ; */

// 本地文件操作模块 ， 路径操作模块。
exports.savePoster = function(req, res, next) {
    // uploadPoster 是input file 控件的 name值
    console.log(req.files)
    var posterData = req.files.uploadPoster;
    var filePath = posterData.path;
    var originalFilename = posterData.originalFilename;

    console.log('1',posterData);
    console.log('2',filePath);
    console.log('3',originalFilename);

    if (originalFilename) {
        //读取文件路径 . 小文件可用 。 大文件用 fs.createReadStream
        fs.readFile(filePath , function(err, data) {
            var timestamp = Date.now();
            var type = posterData.type.split('/')[1];
            var poster = timestamp + '.' + type;
            //生成一个新的路径
            var newPath = path.join(__dirname, '../', '/public/upload/' + poster);

            console.log('4',timestamp);
            console.log('5', type);
            console.log('6',poster);
            console.log('7',newPath);
            //console.log('8',data);
            //读取文件到本地 ， 存到项目目录的 public/upload 文件夹
            fs.writeFile(newPath, data, function(err) {
                req.poster = poster;
                next();
            })
        });
    }
    else {
        next();
    }
};


//电影编辑提交 ， 保存电影
exports.movieSave = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;  //req.body拿表单用post请求到后台的movie对象
    var _movie;

    if (req.poster) {
        movieObj.poster = '/upload/' + req.poster;
    }

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
                console.log('movie',movie)
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
            console.log('movie',movie)

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
        if(err){
            console.log(err);
        }
        res.render('movie_edit',{
            title : '电影录入页',
            movie : movie
        })
    })
};
