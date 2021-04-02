/**
 * Created by chenxingyu on 2016/12/19.
 */
var mongoose = require('../db').mongoose;

var schema = new mongoose.Schema({
    user:String,
    post:String,
    updated: String
});

module.exports = mongoose.model('Posts', schema);