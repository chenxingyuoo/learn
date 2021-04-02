/**
 * Created by mac on 16/6/30.
 */
    //实例化Application
var Application = require('./application');

function createApplication() {
    var app = new Application();
    return app;
}

exports = module.exports = createApplication;