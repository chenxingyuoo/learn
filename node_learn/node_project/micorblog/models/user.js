/**
 * Created by mac on 16/6/30.
 */
var mongoose = require('../db').mongoose;


var schema = new mongoose.Schema({
    name:'string',
    password:'string'
});

var User = mongoose.model('User',schema);

module.exports = User;