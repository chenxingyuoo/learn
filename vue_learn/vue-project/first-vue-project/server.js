// server.js
'use strict'
var fs = require('fs')
var path = require('path')
// 定义全局的Vue为了服务端的app.js
// 获取HTML布局
var layout = fs.readFileSync('./index.html', 'utf8')
// 创建一个渲染器
var renderer = require('vue-server-renderer').createRenderer()
// 创建一个Express服务器
var express = require('express')
var server = express()
// 部署静态文件夹为 "assets"文件夹
server.use('/src', express.static(
  path.resolve(__dirname, 'src')
))

 
var Vue = require('vue')
// var App = require('./src/App.vue')
// import Vue from 'vue'
    // import App from './App'
    // import VueRouter from 'vue-router'

var createApp = function () {
  console.log('test');
    // ---------------------
    // 开始常用的应用代码
    // ---------------------
    // 主要的Vue实例必须返回，并且有一个根节点在id "app"上，这样客户端可以加载它。
    // return new Vue({
    //   template: '<div id="app">你已经在这花了 {{ counter }} 秒。</div>',
    //   data: {
    //     counter: 0
    //   },
    //   created: function () {
    //     var vm = this
    //     setInterval(function () {
    //       vm.counter += 1
    //     }, 1000)
    //   }
    // })

    

    // Vue.use(VueRouter);
    /* eslint-disable no-new */
    return new Vue({
      el: '#app',
      // template : '',
      data: {
        counter: 1
      }
      // render: function() {
        // return '<div id="app">你已经在这花了 {{ counter }} 秒。</div>'
      // }
      // template: '<App/>',
      // components: { App }
    });


    // -------------------
    // 结束常用的应用代码
    // -------------------
  }


// 服务端渲染
// 处理所有的Get请求
server.get('*', function (request, response) {
  // 渲染我们的Vue应用为一个字符串
  renderer.renderToString(
    // 创建一个应用实例
    createApp(),
    // 处理渲染结果
    function (error, html) {
      // 如果渲染时发生了错误
      if (error) {
        // 打印错误到控制台
        console.error(error)
        // 告诉客户端错误
        return response
          .status(500)
          .send('Server Error')
      }
      // 发送布局和HTML文件
      response.send(layout.replace('<div id="app"></div>', html))
    }
  )
})
// 

//流式渲染

// // 拆分布局成两段HTML
// var layoutSections = layout.split('<div id="app"></div>')
// var preAppHTML = layoutSections[0]
// var postAppHTML = layoutSections[1]
// // 处理所有的Get请求
// server.get('*', function (request, response) {
//   // 渲染我们的Vue实例作为流
//   var stream = renderer.renderToStream(require('./assets/app')())
//   // 将预先的HTML写入响应
//   response.write(preAppHTML)
//   // 每当新的块被渲染
//   stream.on('data', function (chunk) {
//     // 将块写入响应
//     response.write(chunk)
//   })
//   // 当所有的块被渲染完成
//   stream.on('end', function () {
//     // 将post-app HTML写入响应
//     response.end(postAppHTML)
//   })
//   // 当渲染时发生错误
//   stream.on('error', function (error) {
//     // 打印错误到控制台
//     console.error(error)
//     // 告诉客服端发生了错误
//     return response
//       .status(500)
//       .send('Server Error')
//   })
// })

// 监听5000端口
server.listen(3000, function (error) {
  if (error) throw error
  console.log('Server is running at localhost:3000')
})