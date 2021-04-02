/**
 * Created by Administrator on 2016/9/3.
 */

//webpack 命令
// $ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
//
// $ webpack --watch   //监听变动并自动打包
//
// $ webpack -p    //压缩混淆脚本，这个非常非常重要！
//
// $ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了

'use strict';

var path = require("path");
var utils = require('./build/utils')
let webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var projectRoot = path.resolve(__dirname, './')

var config = require('./config')

var env = process.env.NODE_ENV
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


module.exports = {
  //页面入口文件配置
  entry: {
    app: [
      './src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, "./dist/static/js"),
    publicPath: './static/js/',
    filename: 'app.js'
  },
  watch: true,
  //插件
  plugins: [
    new webpack.optimize.DedupePlugin(), 　//检测相似的文件，或者文件中重复的内容 ， 然后消除掉
    // new webpack.HotModuleReplacementPlugin(),  //用来实现我们使用webpack-dev-server本地开发调试的热更新
    new webpack.NoErrorsPlugin(),  ////保证编译过程不会出错
    /* new BowerWebpackPlugin({
     searchResolveModulesDirectories: false
     }),*/
    // new webpack.optimize.UglifyJsPlugin(), 　　//压缩输出的js代码
    new webpack.optimize.OccurenceOrderPlugin(), //按照引用频度来排序各个模块
    new webpack.optimize.AggressiveMergingPlugin(), //用来优化生成的代码段，合并相似的串，取公共部分
    // new webpack.optimize.CommonsChunkPlugin("commons.js", [path.resolve(__dirname, './src/*.js')]),
    /*new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      {from: './static/!**!/!*', to: path.resolve(__dirname, '../dist')},
    ])*/

  ],

  module: {
    //加载器配置 ， 编译coffeeScript , JSX + ES6 , 编译成js语言（浏览器能识别的语言）， sass , scss , less 编译等
    //要使用这个loader ， 要先安装这个loader
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }), //css loader
    ]
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  vue: {
    loaders: utils.cssLoaders({sourceMap: useCssSourceMap}),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
};
