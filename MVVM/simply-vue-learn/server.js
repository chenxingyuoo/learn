/**
 * Created by chenxingyu on 2016/11/25.
 */

'use strict';
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let example = require('./config');
let config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:"+ example.port +"/", "webpack/hot/dev-server");
let compiler = webpack(config);

console.log(compiler);

let open = require('open');
let server = new WebpackDevServer(compiler, example.devServer);
server.listen(example.port , 'localhost' , (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:' + example.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + example.port + '/webpack-dev-server/');
});