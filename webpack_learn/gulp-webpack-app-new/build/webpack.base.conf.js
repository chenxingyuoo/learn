/**
 * Created by chenxingyu on 2017/2/10.
 */
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    //入口文件配置
    entry: utils.getEntry('./src/module/**/app.js'),
    watch : true,
    //文件导出的配置
    output:{
        path: path.resolve(__dirname,"../static"),
        publicPath: '/',
        filename:"js/[name].js"
    },
    resolve: {
        extensions: ['', '.js'],
    },
    module: {
        loaders: [
            //babel es6 转换 es5
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

            //编译ejs模板
            { test: /\.ejs$/, loader: 'ejs-loader?variable=data' },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

             //提取图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },

            //提取字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            },
            
             //单独提取css文件
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            },
        ]
    },
    //插件
    plugins: [

    ],
     //配置postcss 添加自动增加css前缀插件
    postcss: [
        require('precss'),
        require('autoprefixer')
    ]
};

module.exports = config;