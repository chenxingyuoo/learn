/**
 * Created by chenxingyu on 2017/1/19.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');


var config = {
    //入口文件配置
    entry: path.resolve(__dirname,'./src/js/main.js'),
    watch : true,
    //文件导出的配置
    output:{
        path: path.resolve(__dirname,"./dist/"),
        filename:"js/[name].js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
          
             //不提取css文件 ， 但会以blob链接加载css文件
             // {
             //    test: /\.css$/, // Only .css files
             //    loader: 'style-loader!css-loader' // Run both loaders
             // },
             // {
             //    test: /\.scss$/,
             //    loader: 'style-loader!css-loader?modules&sourceMap!sass-loader?outputStyle=expanded&sourceMap'
             // }

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
        new webpack.NoErrorsPlugin(),  ////保证编译过程不会出错
        // new ExtractTextPlugin("style.css")
        // new ExtractTextPlugin("css/[name].[hash].css"),
        require('precss'),
        require('autoprefixer'),
        //提取出css文件
        new ExtractTextPlugin("css/[name].css"),
    ]
};

module.exports = config;