/*
 * @Description: 这是***页面
 * @Date: 2022-09-04 14:01:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      return new Promise((resolve, reject) => { 
        setTimeout(() => {
          resolve('')
          this.counter++
        }, 1000);
       })
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  }
})
