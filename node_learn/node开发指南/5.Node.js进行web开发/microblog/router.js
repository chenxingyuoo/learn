/**
 * Created by chenxingyu on 2016/12/19.
 */

//routes
var index = require('./routes/index');
var users = require('./routes/users');

module.exports = function (app) {
    app.use('/', index);
    app.use('/users', users);
};