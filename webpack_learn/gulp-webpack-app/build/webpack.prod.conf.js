/**
 * Created by chenxingyu on 2017/2/10.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


let webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        //压缩js插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});

module.exports = webpackConfig;