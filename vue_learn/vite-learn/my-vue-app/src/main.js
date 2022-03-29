/*
 * @Description: 这是***页面
 * @Date: 2021-04-12 11:18:15
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './plugin/router'
import store from './plugin/store'
import i18n from './plugin/i18n'

createApp(App).use(router).use(store).use(i18n).mount('#app')
