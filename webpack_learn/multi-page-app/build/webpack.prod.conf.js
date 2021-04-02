/**
 * Created by chenxingyu on 2017/2/10.
 */
const webpack = require('webpack');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


let webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        //检测相似的文件，或者文件中重复的内容 ， 然后消除掉
        // new webpack.optimize.DedupePlugin(), 　

        //压缩js插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        //提取出css文件 并且压缩
        new ExtractTextPlugin(utils.assetsPath("css/[name].css"), {allChunks: true}),

        //优化\最小化CSS
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
    ]
});

module.exports = webpackConfig;