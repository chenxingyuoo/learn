/**
 * Created by chenxingyu on 2016/12/29.
 */
var webpack = require('webpack');
var path = require('path');

var config = {
    //入口文件配置
    entry:path.resolve(__dirname,'src/event.js'),
    //文件导出的配置
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:"event.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};

module.exports = config;