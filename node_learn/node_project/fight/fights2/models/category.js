/**
 * Created by mac on 16/7/7.
 */
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
//编译生成 Category 模型 ， 通过调用 mongoose.model（’模型的名字‘,’模式‘）
var Category = mongoose.model('Category',CategorySchema);

//将模型的构造函数导出
module.exports = Category;