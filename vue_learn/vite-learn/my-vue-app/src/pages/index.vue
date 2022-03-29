<!--
 * @Description: 这是***页面
 * @Date: 2021-04-12 14:35:34
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
-->
<template>
  <div>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ja">ja</option>
    </select>
    <Hello></Hello>
  </div>
</template>

<script setup>
import { defineProps, defineEmit, useContext, defineAsyncComponent } from 'vue'
import { getCurrentInstance } from 'vue'
import zh from '../i18n/zh.json'
import { useI18n } from 'vue-i18n'
import Hello from '../components/Hello.jsx'

// use local scope
const { t, locale } = useI18n({
  // `locale` inherit from global scope
  inheritLocale: true
})

const props = defineProps({
  foo: String
})
const emit = defineEmit(['change', 'delete'])

const { slots, attrs } = useContext()

console.log('props', props)
console.log('emit', emit)
console.log('slots', slots)
console.log('attrs', attrs)

const internalInstance = getCurrentInstance()
console.log('internalInstance', internalInstance.ctx.$store.state)
</script>

<style lang="less" scoped></style>
