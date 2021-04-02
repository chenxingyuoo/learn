/**
 * Created by mac on 16/7/6.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
//编译生成 Comment 模型 ， 通过调用 mongoose.model（’模型的名字‘,’模式‘）
var Comment = mongoose.model('Comment',CommentSchema);

//将模型的构造函数导出
module.exports = Comment;