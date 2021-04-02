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


//电影分类保存
exports.movieCategorySave = function (req , res) {
    var _category = req.body.category;
    var id = _category._id;

    //有id 就是存在分类 ， 更新分类
    if(id){
        Category.findById(id, function (err, category) {

            if(err){
                console.log(err);
            }

            //深拷贝
            function extend(target, source) {//target 旧的 source新的
                for (var i in source) {
                    target[i] = source[i];
                }
                return target;
            }

            var newCategory = extend(category, _category);

            newCategory.save(function (err, newCategory) {
                if(err){
                    console.log(err)
                }

                res.redirect('/admin/movie_category/list');
            })

        });

        //否则是编辑 ， 新建分类
    }else{
        var category = new Category(_category);

        category.save(function(err, category) {

            if (err) {
                console.log(err)
            }

            res.redirect('/admin/movie_category/list');
        })
    }
};

//分类列表
exports.movieCategoryList = function (req, res) {
    Category.fetch(function (err, category) {
        if(err){
            console.log(err);
        }

        res.render('movie_category_list',{
            title : '电影分类列表',
            category : category
        });
    })
};


//电影分类更新
exports.movieCategoryUpdate = function (req, res) {
    var id = req.params.id;
    Category.findById(id, function (err, category) {
        if(err){
            console.log(err);
        }

        res.render('movie_category',{
            title : '电影分类更新',
            category : category
        });
    });
};

//电影分类删除
exports.movieCategoryDelete = function (req, res) {
    var id = req.body.id;
    Category.remove({_id : id}, function (err, category) {
        if(err){
            console.log(err);
        }
        var data = {
            success  : 1,
            msg : '删除成功'
        };

        res.json(data);
    });
};