import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const o = {
  en: {
    message: {
      hello: '{msg} world'
    }
  },
  zh: {
    message: {
      hello: '{msg} 界'
    }
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages: o
})

export default i18n
