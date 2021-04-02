/**
 * Created by mac on 16/7/5.
 */
var mongoose = require('mongoose');


//字段类型
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
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
MovieSchema.pre('save',function(next){
    if(this.isNew){
        //创建时间，更新时间设为当前时间
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    //调用next 才能存储
    next();
});

// 添加 mongoose 静态方法，静态方法在Model模型层就能使用
MovieSchema.statics = {
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
module.exports = MovieSchema