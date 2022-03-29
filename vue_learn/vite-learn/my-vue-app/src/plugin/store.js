/*
 * @Description: 这是***页面
 * @Date: 2021-04-12 18:31:49
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */

import { createStore } from 'vuex'

const moduleA = {
  state: () => ({ name: 'a' }),
  mutations: {},
  actions: {},
  getters: {
    name: (state) => state.name
  }
}

const moduleB = {
  state: () => ({ name: 'b' }),
  mutations: {},
  actions: {}
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

export default store
