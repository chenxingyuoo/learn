/**
 * Created by chenxingyu on 2017/2/10.
 */
"use strict";
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const utils = require('./utils');
const webpackDevConfig = require('./webpack.dev.conf');
const port = 9090;
let compiler = webpack(webpackDevConfig);

//添加 webpack-dev-server 到入口文件
Object.keys(webpackDevConfig.entry).forEach(function (name) {
    webpackDevConfig.entry[name].unshift(`webpack-dev-server/client?http://localhost:${port}/`, "webpack/hot/dev-server");
});

new WebpackDevServer(compiler , {
    devServer : {
        contentBase: "./",        //指定webpack-dev-server 服务的文件夹 ， 不设置就是默认根目录
        historyApiFallback: false, 
        inline: true,
        hot: true, //开启热更新
        port: port,
        noInfo: false, 
        stats: { colors: true },
    }
})
    .listen(port, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Listening at localhost:${port}/webpack-dev-server/views`);
        // open('http://localhost:' + port + '/webpack-dev-server/');
    });

// const path = require('path');
// const express = require('express');
// const ejs = require('ejs');
// const opn = require('opn');
// const webpack = require('webpack');
// const WebpackDevMiddleware = require('webpack-dev-middleware');
// const WebpackHotMiddleware = require('webpack-hot-middleware');
// const webpackDevConfig = require('./webpack.dev.conf');
//
// const app = express();
// var compiler = webpack(webpackDevConfig);
//
// const port = 9090;
//
//
// // handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())
//
// app.use(WebpackDevMiddleware(compiler, {
//     publicPath: webpackDevConfig.output.publicPath,
//     stats: { colors: true }
// }));
//
// var hotMiddleware = require('webpack-hot-middleware')(compiler);
// // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//         hotMiddleware.publish({ action: 'reload' })
//         cb()
//     })
// })
//
// app.use(hotMiddleware);
//
//
// app.set('views', './views');
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');
// // app.use(express.static('./dist'));
// app.use(express.static(path.join(__dirname, '../'))); //静态资源
//
// module.exports = app.listen(port, function (err) {
//     if (err) {
//         console.log(err)
//         return
//     }
//     var uri = 'http://localhost:' + port
//     console.log('Listening at ' + uri + '\n')
//     opn(uri)
//
// })