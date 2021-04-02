import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import KZUI from '@kuaizi/kz-ui/'
import '@kuaizi/kz-ui/lib/theme-kz.css'
Vue.use(KZUI)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
