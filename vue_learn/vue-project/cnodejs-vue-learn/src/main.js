// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './vuex/store'

import { timeToNow, transTab} from './filters'

import VueResource from 'vue-resource'; //网络请求
//css
import './assets/css/element_ui.css';
// import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)

////自定义过滤器
Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
