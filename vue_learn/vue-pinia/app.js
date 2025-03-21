/*
 * @Description: 这是***页面
 * @Date: 2022-09-04 18:03:51
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
// app.js (在服务器和客户端之间共享)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
