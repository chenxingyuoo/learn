// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  render: h => h(App)
});
