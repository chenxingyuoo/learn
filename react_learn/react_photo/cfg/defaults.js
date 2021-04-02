/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 9000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    //处理loader的时候先用eslint-loader进行文件校验
    preLoaders: [
      {
        test: /\.(js|jsx)$/,   //当require 的文件后缀为js / jsx 的时候
        include: srcPath,        //路径
        loader: 'eslint-loader'  //使用eslint-loader 语法检查
      }
    ],
    // 加载器配置
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers : ["last 2 version"]}'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers : ["last 2 version"]}!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.style/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test : /\.json$/,
        loader : 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192' //文件大小小于8k ， 不返回url地址，直接返回文件base64
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
