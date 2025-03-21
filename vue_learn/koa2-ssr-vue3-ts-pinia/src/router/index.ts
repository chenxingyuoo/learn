/*
 * @Description: 这是***页面
 * @Date: 2022-09-08 02:39:01
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
  Router
} from 'vue-router';

export const createRouter = (type: 'client' | 'server'): Router =>
  createVueRouter({
      history: type === 'client' ? createWebHistory() : createMemoryHistory(),

      routes: [
          {
              path: '/',
              name: 'index',
              meta: {
                  title: '首页',
                  keepAlive: true,
                  requireAuth: true
              },
              component: () => import('@/pages/index.vue')
          },
          {
              path: '/login',
              name: 'login',
              meta: {
                  title: '登录',
                  keepAlive: true,
                  requireAuth: false
              },
              component: () => import('@/pages/login.vue')
          },
          {
              path: '/user',
              name: 'user',
              meta: {
                  title: '用户中心',
                  keepAlive: true,
                  requireAuth: true
              },
              component: () => import('@/pages/user.vue')
          }
      ]
  });

