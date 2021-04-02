/**
 * Created by Administrator on 2016/9/3.
 */

//webpack 的执行
//$ webpack --display-error-details
//后面的参数“--display-error-details”是推荐加上的，方便出错时能查阅更详尽的信息（比如 webpack 寻找模块的过程），从而更好定位到问题。

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
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
let example = require('./config');
//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
// console.log(__dirname);
let webpack = require('webpack');
var projectRoot = path.resolve(__dirname, './')

// console.log(projectRoot, 'projectRoot');

module.exports = {
    //页面入口文件配置
   /* entry: './main.js',
    //入口文件输出配置
    output: {
        filename: 'bundle.js'
    },*/

    //页面入口文件配置

    entry: {
        app: [
            './src/vue.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist")/*'/dist'*/,
        filename: 'vue.js'
    },
    watch: true,
    //入口文件输出配置
   /* output: {
        //path.resolve 将 to('build') 参数解析为绝对路径。
        //path.join 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
        // path : path.join(__dirname, 'build/assets'),
        path: path.resolve(__dirname, "build/assets"),   //存放生成的bundle.js地方。
        publicPath: "/assets/",   //引入一个publicPath，这里写的路径才让你在index.html中引入的到。 如<script src="assets/bundle.js"></script>
        filename: "bundle.js"
    },*/
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
        new webpack.optimize.CommonsChunkPlugin("commons.js", [path.resolve(__dirname, 'app/*.js')])
    ],

    module: {
        //加载器配置 ， 编译coffeeScript , JSX + ES6 , 编译成js语言（浏览器能识别的语言）， sass , scss , less 编译等
        //要使用这个loader ， 要先安装这个loader
        loaders: [
            // { test: /\.coffee$/, loader: 'coffee-loader' },
            {
                test: /\.(js)$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            /*{
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
                loader: 'url-loader?limit=8192'//文件大小小于8k ， 不返回url地址，直接返回文件base64
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }*/
        ]
    },

    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        // root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
       /* alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }*/
    }
};