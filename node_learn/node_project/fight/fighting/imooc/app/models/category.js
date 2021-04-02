/**
 * Created by mac on 16/7/4.
 */
var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category')
var Category = mongoose.model('Category', CategorySchema)

module.exports = Category