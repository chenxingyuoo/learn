/*
 * @Description: 这是***页面
 * @Date: 2022-09-04 14:01:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import type { Plugin } from 'vue'

function identity<T>(arg: T): T {
  return arg;
}

function loggingIdentity<T>(arg: Array<T>): T[] {
  console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}

const arr: number[] = [1]

loggingIdentity(arr)

type P = Plugin


const router: P = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
