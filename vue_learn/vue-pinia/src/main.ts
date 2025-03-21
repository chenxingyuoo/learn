/*
 * @Description: 这是***页面
 * @Date: 2022-09-04 14:01:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { PiniaPluginContext } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import type { App as AppType, Component, ComponentOptions, ComponentPublicInstance } from 'vue'

const app = createApp(App)

app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => { 

}

app.config.performance = true

function reactive<T extends object>(target: T): void {}


function SecretPiniaPlugin(context: PiniaPluginContext) {
  console.log('context', context)
  
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将插件提供给 pinia
pinia.use(SecretPiniaPlugin)

app.use(pinia)
app.use(router,{

})

const MyPlugin = {
  install(app: AppType, options: any[]) {
    // 配置此应用
  }
}


app.use(MyPlugin,[{
  name: 'MyPlugin'
},{
  name: 'MyPlugin'
}])

app.mount('#app')
