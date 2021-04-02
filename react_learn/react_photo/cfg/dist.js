'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  //插件
  plugins: [
    new webpack.optimize.DedupePlugin(), 　//检测相似的文件，或者文件中重复的内容 ， 然后消除掉
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(), 　　//压缩输出的js代码
    new webpack.optimize.OccurenceOrderPlugin(), //按照引用频度来排序各个模块
    new webpack.optimize.AggressiveMergingPlugin(), //用来优化生成的代码段，合并相似的串，取公共部分
    new webpack.NoErrorsPlugin() //保证编译过程不会出错
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
