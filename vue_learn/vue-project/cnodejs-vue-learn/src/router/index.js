/**
 * Created by chenxingyu on 2016/12/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

//views
import page from '../views/page';
import login from '../views/login';
import user from '../views/user';
import messages from '../views/messages';
import post from '../views/post';


Vue.use(VueRouter);

//实例化 VueRouter ， 配置参数
const router = new VueRouter({
    history: true,
    hashbang: false,
    transitionOnLoad: true,
    routes: [
      {
        path: '/',
        name: 'index',
        component: page,
      },
      {
        path: '/login',
        name: 'login',
        component: login,
      },
      {
        path: '/user',
        name: 'user',
        component: user,
      },
      {
        path: '/messages',
        name: 'messages',
        component: messages,
      },
      {
        path : '/post/:id',
        name : 'post',
        component: post,
      }
    ]
})
;

export default router;
