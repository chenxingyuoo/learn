/**
 * Created by chenxingyu on 2016/12/19.
 */
var mongoose = require('../db').mongoose;

var schema = new mongoose.Schema({
    name:'string',
    password:'string'
});

module.exports = mongoose.model('Users', schema);