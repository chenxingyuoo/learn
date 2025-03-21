/*
 * @Description: 这是***页面
 * @Date: 2022-09-04 17:58:37
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
// 此文件运行在 Node.js 服务器上
// import { createSSRApp } from 'vue'
const { createSSRApp } = require('vue')
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
const { renderToString } = require('vue/server-renderer')
// import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then(html => {
  console.log(html)
})
