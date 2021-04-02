/**
 * Created by mac on 16/1/5.
 */
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

//操作数据库
var mongoose = require('mongoose');
//传入本地数据库 ， 名字dome_movie
mongoose.connect('mongodb://localhost/domemovies');
var _ = require('underscore');  //直接用npm 安装的模块 不需要加 ./ 等路径前缀
//导入数据库模型
var Movie = require('./models/movie');

app.set("views","./views/pages");  //设置视图的根目录
app.set("view engine","jade");  //设置默认的模板引擎


var bodyParser = require('body-parser'); //需要安装模块npm install body-parser
app.use(bodyParser.urlencoded({extended: true}));// .传给后台post，将表单数据格式化
app.use(express.static(path.join(__dirname, 'public')));//__dirname 当前目录找静态资源库文件
app.locals.moment = require('moment'); //moment模块 时间格式
app.listen(port);  //监听端口

console.log('demo_movie begin ' + port);


//home page
app.get('/',function (req,res){
    Movie.fetch(function (err,movies){
        if(err){
            console.log('home is ' + err);
        }else{
            //调用模板
            res.render('index',{
                title : 'demo_movie 首页',
                movies : movies
            })
        }
    })
})


/*var ejs = require('./views/pages/a'), str = require('fs').readFileSync(__dirname + '/list.ejs', 'utf8');

var ret = ejs.render(str, {
    names: ['foo', 'bar', 'baz']
});

console.log(ret);*/

/*//home page
app.get('/a',function (req,res){
    Movie.fetch(function (err,movies){
        if(err){
            console.log('home is ' + err);
        }else{
            //调用模板
            res.render('a',{
                /!*title : 'demo_movie 首页',*!/
                /!*movies : movies*!/
            })
        }
    })
})*/


//admin page
app.get('/admin/movie',function (req,res){
    //调用模板
    res.render('admin',{
        title : 'demo_movie 后台录入页',
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
    })
})



//在列表页/admin/list 点击更新 会重新回到 后台录入页admin/movie
//admin updata movie
app.get('/admin/update/:id',function (req,res){
    // :id 是url /movie/值 后面的值 ， 通过req.params.id 获取这个值
    var id = req.params.id; //req.params 拿express路由器传递的参数
    if(id){
        Movie.findById(id,function (err,movie){
            if (err){
               console.log(err);
            }else{
                res.render('admin',{
                    title : "dome_movie 后台录入页",
                    movie:movie
                })
            }
        })
    }
})


//后台录入页，表单提交过来后电影的存储 ，添加一个路由 ， post请求
//admin post movie
app.post('/admin/movie/new',function (req,res){
    //判断，post进来的数据可能是新加的 ， 可能更新过
    var id = req.body.movie._id;  //req.body拿表单用post请求到后台 的_id
    var movieObj = req.body.movie; //req.body拿表单用post请求到后台的movie对象
    var _movie;

    if(id !== 'undefined'){  //说明这部电影已经存储到数据库过的，进行更新
        //找到这部电影
        Movie.findById(id,function (err,movie){
            if(err){
                console.log(err);
            }else{

                //用post 进来的电影数据或者更新的电影数据替换掉 已经老的 电影  underscore 的 extend方法 ,underscore 这个模块要安装 npm install underscore
                _movie = _.extend(movie,movieObj)  //查询后的参数1 movie ，拿视图有定义的movie对象参数2 movieObj

                //调用_movie的save 方法
                _movie.save(function(err,movie){
                    //回调函数可拿到是否异常，save后的 movie(数据)
                    if(err){
                        console.log(err);
                    }else{

                        //电影数据更新了并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面 ,res.redirect方法
                        res.redirect('/movie/' + movie._id) //地址要是重定向的地址，也就是详情页的地址
                    }
                })
            }
        })
    }else{
        // if id == ‘undefined’ ，否则这部电影是新加的
        //调用模型的构造函数 实例化 ,定义字段的数据参数
        _movie = new Movie({
            doctor : movieObj.doctor,
            title : movieObj.title,
            country : movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })

        //调用_movie的save 方法
        _movie.save(function (err,movie){
            if (err){
               console.log(err);
            }else{

                //电影有新数据并且存入成功了，我们把这个页面重定向到这部电影对应的详情页面
                res.redirect('/movie/' + movie._id)  //电影详情页的路由 movie/:id  ，redirect 的 地址要跟它对应
            }
        })
    }
})


//detail page
app.get('/movie/:id',function (req,res){
    //通过 res.params 拿url 中 id 这个值
    var id = req.params.id;
    if(id){  //如果有id ， 调用模型下的findById 静态方法 ， 传id 查找一条
        Movie.findById({_id:id},function (err,movie){
           //调用模板
           res.render('detail',{
               title : 'demo_movie 详情页',
               movie : movie
           })
        })
    }
})


//movie list page
app.get('/admin/list',function (req,res){
    //模型下的fetch 方法 ， 查找数据库所有数据
    Movie.fetch(function (err,movies){
        if(err){
            console.log("list is " + err);
        }else{
            //调用模板
            res.render('list',{
                title : 'demo_movie 列表页',
                movies : movies
            })
        }
    })
})



//movie list page 删除按钮
app.delete('/admin/list',function (req,res){
    //id是url ？号 后面得值，通过query拿
    var id = req.query.id;  //req.query直接获取地址栏传递的参数

    if(id){
       Movie.remove(id,function (err,movie){
           if (err){
             console.log(err);
           }else{
               //给客户端返回一段数据
               res.json({success: 1})
           }
       })
    }
})
