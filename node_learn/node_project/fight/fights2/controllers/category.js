/**
 * Created by mac on 16/7/7.
 */
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//电影编辑页
exports.categoryEdit = function (req , res) {
    res.render('movie_category',{
       title : '电影分类录入',
       category: {}
    });
};

exports.movieCategorySave = function (req , res) {
    var _category = req.body.category;

    console.log('1',_category)

    var category = new Category(_category);

    category.save(function(err, category) {

        console.log(category)

        if (err) {
            console.log(err)
        }

        res.redirect('/admin/movie_category/list');
    })
};

