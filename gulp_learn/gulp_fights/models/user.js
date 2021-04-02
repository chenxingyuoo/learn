var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
//编译生成User模型 ， 通过调用 mongoose.model（’模型的名字‘,’模式‘）
var User = mongoose.model('User',UserSchema);

//将模型的构造函数导出
module.exports = User