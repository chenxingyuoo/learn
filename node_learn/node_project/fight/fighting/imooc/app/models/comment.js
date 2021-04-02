/**
 * Created by mac on 16/7/5.
 */
var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment')
var Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment