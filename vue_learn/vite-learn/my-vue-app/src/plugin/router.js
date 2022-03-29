/*
 * @Description: 这是***页面
 * @Date: 2021-04-12 14:35:17
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: () => import('../pages/index.vue') }]
})

export default router
