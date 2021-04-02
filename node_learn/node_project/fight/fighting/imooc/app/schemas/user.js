/**
 * Created by mac on 16/1/5.
 */

//   mongoose.Schema 模式接口 ， 定义 文档结构（数据类型）
var mongoose = require('mongoose');
//加密算法模块
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

//字段类型
var UserSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
    },
    password : String,
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt:{
            type : Date ,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

//每次存储数据库调用的方法 ， 保存数据库更新时间
UserSchema.pre('save',function(next){
    var user = this;

    if(this.isNew){
        //创建时间，更新时间设为当前时间
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    //利用加密算法模块 ， 密码加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        //再进行hash ， 散列算法
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            //用户密码保存 hash 后的值
            user.password = hash;
            //调用next下一步 才能存储
            next();
        });
    });
});


UserSchema.methods = {
    comparePassword : function (_password, cb) {
        //检测一个密码
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if(err) return cb(err);

            cb(null, isMatch);
        });
    }
};

// 添加 mongoose 静态方法，静态方法在User模型层就能使用
UserSchema.statics = {
    //fetch 取出数据库所有的数据
    fetch: function(cb){
        return this
            .find({})  //查找数据库所有数据
            .sort('meta.updateAt') //按照更新时间排序数据
            .exec(cb) //执行回调方法
    },
    //查询单条数据的方法
    findById: function(id,cb){
        return this
            //查找一条，通过id
            .findOne({_id:id})
            //执行回调方法
            .exec(cb)
    }
};

//将模式导出
module.exports = UserSchema
