/**
 * Created by mac on 16/6/30.
 */
var mongoose=require('../db').mongoose;

var schema=new mongoose.Schema({
    user:String,
    post:String,
    updated: String
});

var Post = mongoose.model('Post',schema);

module.exports = Post;