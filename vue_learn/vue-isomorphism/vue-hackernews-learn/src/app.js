// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './vuex/store'

import { timeToNow, transTab} from './filters'


sync(store, router);

////自定义过滤器
Vue.filter('timeToNow', timeToNow);
Vue.filter('transTab', transTab);

/* eslint-disable no-new */
const app = new Vue({
    router,
    store,
    render: h => h(App)
})

export { app, router, store }
