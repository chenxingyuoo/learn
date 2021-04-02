'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  //插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  //用来实现我们使用webpack-dev-server本地开发调试的热更新
    new webpack.NoErrorsPlugin(),  ////保证编译过程不会出错
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here

//transpiling 将一种语言转换为另一种具有相同抽象层次的语言
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader', //先babel-loader，用来把es6语法写出来的js代码 transpiling 成现代浏览器所能理解的es5代码// js代码
  include: [].concat(               //react-hot将react的组件实时编译进行更新的loader
    config.additionalPaths,         //! 分隔号 ， 从右到左执行
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
