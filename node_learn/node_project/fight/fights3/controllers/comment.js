/**
 * Created by mac on 16/7/6.
 */
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

exports.userComment = function (req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    console.log(_comment)

    //如果有cid传过来 ， 说明是回复一个用户的操作 ， 已经存在这条评论
    if(_comment.cid){
        //
        Comment.findById(_comment.cid, function(err, comment) {
            if(err){
                console.log(err);
            }

            var reply = {
                from : _comment.from,
                to: _comment.tid,
                content : _comment.content
            };

            //把这个对象 push 进  comment.reply 数组
            comment.reply.push(reply);

            //保存回复评论
            comment.save(function (err, comment) {
                if(err){
                    console.log(err);
                }

                res.redirect('/admin/movie/detail/' + movieId);
            });
        });
        //否则评论电影
    }else{
        //new 一个 Comment 。
        var comment = new Comment(_comment);

        //保存一个 comment
        comment.save(function (err, comment) {
            if(err){
                console.log(err);
            }

            res.redirect('/admin/movie/detail/' + movieId);
        })
    }

};