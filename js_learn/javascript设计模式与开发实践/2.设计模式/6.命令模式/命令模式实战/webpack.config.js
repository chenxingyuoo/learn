/**
 * Created by chenxingyu on 2017/3/6.
 */
/**
 * Created by chenxingyu on 2017/2/10.
 */
const path = require('path');
const webpack = require('webpack');

var config = {
    //入口文件配置
    entry: './js/main.js',
    watch : true,
    //文件导出的配置
    output:{
        path: path.resolve(__dirname,"./dist"),
        publicPath: '/',
        filename:"[name].js"
    }
};

module.exports = config;