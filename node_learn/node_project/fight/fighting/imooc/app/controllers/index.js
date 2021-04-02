/**
 * Created by mac on 16/7/4.
 */

var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

/*var Movie = require('../models/movie'); //导入模型
var User = require('../models/user'); //导入模型*/
//var _ = require('underscore'); //需要安装模块 mpm install underscore

exports.index = function (req, res) {
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
};
