/*
 * @Description: 这是***页面
 * @Date: 2021-04-12 17:03:26
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import * as vueI18n from 'vue-i18n'

console.log('vueI18n', vueI18n)

const i18n = vueI18n.createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    zh: {
      messages: '新'
    },
    en: {
      messages: 'new'
    }
  }
})

console.log('i18n', i18n)

export default i18n
