/**
 * 本地预览
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');


module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './examples/main',
        vendors: ['vue', 'vue-router','axios']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            myDesign: '../../src/index',
            vue: 'vue/dist/vue.js'
        }
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../examples/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        })
    ]
});