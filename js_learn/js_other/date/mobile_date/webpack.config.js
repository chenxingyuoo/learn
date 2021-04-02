/**
 * Created by chenxingyu on 2017/1/19.
 */
var webpack = require('webpack');
var path = require('path');

var config = {
    //入口文件配置
    entry:path.resolve(__dirname,'src/calendar.js'),
    watch : true,
    //文件导出的配置
    output:{
        path: path.resolve(__dirname,"dist"),
        filename:"calendar.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};

module.exports = config;