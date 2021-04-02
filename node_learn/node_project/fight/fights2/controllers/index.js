/**
 * Created by mac on 16/7/5.
 */

var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')


exports.index = function (req, res) {
    //模型下的fetch 方法 ， 查找数据库所有数据
    Movie.fetch(function(err,movies){
        if(err){
            console.log("err is" + err)
        }

        res.render('index',{
            title : "首页",
            movies : movies
        });
    })
};
