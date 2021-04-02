/**
 * Created by mac on 16/1/5.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
//编译生成Movie模型 ， 通过调用 mongoose.model（’模型的名字‘,’模式‘）
var Movie = mongoose.model('Movie',MovieSchema);

//将模型的构造函数导出
module.exports = Movie;