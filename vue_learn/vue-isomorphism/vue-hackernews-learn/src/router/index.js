/**
 * Created by chenxingyu on 2016/12/8.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';     //路由

//views
import post from '../views/post.vue';

// import createListView from '../views/createListView.js';
const createListView = name => () => {
    return System.import('../views/CreateListView').then(m => m.createListView(name))
};


Vue.use(VueRouter);

//实例化 VueRouter ， 配置参数
const router = new VueRouter({
        // history: true,
        // hashbang: false,
        // transitionOnLoad: true,
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            {
                path: '/',
                redirect: '/all'
            },
            {
                path: '/all/:page(\\d+)?',
                name: 'all',
                component: createListView('all'),
            },
            {
                path: '/good/:page(\\d+)?',
                name: 'good',
                component: createListView('good'),
            },
            {
                path: '/share/:page(\\d+)?',
                name: 'share',
                component: createListView('share'),
            },
            {
                path: '/ask/:page(\\d+)?',
                name: 'ask',
                component: createListView('ask'),
            },
            {
                path: '/job/:page(\\d+)?',
                name: 'job',
                component: createListView('job'),
            },
            {
                path: '/post/:id',
                name: 'post',
                component: post,
            }
        ]
    })
    ;

export default router;
