/**
 * Created by chenxingyu on 2017/1/19.
 */
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// console.log(utils.assetsPath("css/[name].css"));

module.exports = merge(baseWebpackConfig, {
    // devtool: '#eval-source-map',//配置生成Source Maps，选择合适的选项
    plugins : [

        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        //保证编译过程不会出错
        // new webpack.NoEmitOnErrorsPlugin(),

        //提取出css文件
        new ExtractTextPlugin("css/[name].css"),
    ]

});

