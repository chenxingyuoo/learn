/**
 * Created by chenxingyu on 2017/1/19.
 */
const webpack = require('webpack');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//     baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// });
//

console.log(utils.assetsPath("css/[name].css"));

module.exports = merge(baseWebpackConfig, {
    // devtool: '#eval-source-map',//配置生成Source Maps，选择合适的选项
    plugins : [
        //检测相似的文件，或者文件中重复的内容 ， 然后消除掉
        // new webpack.optimize.DedupePlugin(),

        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        //保证编译过程不会出错
        new webpack.NoErrorsPlugin(),

        new webpack.HotModuleReplacementPlugin(),  //用来实现我们使用webpack-dev-server本地开发调试的热更新

        //提取出css文件
        new ExtractTextPlugin(utils.assetsPath("css/[name].css")),

        // new HtmlWebpackPlugin({
        //     filename: 'home.html',
        //     template: 'views/home.html',
        //     inject: true
        // })
    ],

});

