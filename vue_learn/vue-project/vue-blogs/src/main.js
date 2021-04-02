// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
// import configRouter from './routers';
import { timeToNow, comment, timeToUpdata } from './filters';

import store from './vuex/store';

//自定义过滤器
// 注册
Vue.filter('timeToNow', timeToNow);
Vue.filter('comment', comment);
Vue.filter('timeToUpdata', timeToUpdata);

/*router.redirect({
  '*': '/',
});*/

import style from './assets/style.css';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


