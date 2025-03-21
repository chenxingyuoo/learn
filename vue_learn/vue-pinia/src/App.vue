<!--
 * @Description: 这是***页面
 * @Date: 2022-09-04 14:01:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, watch, onRenderTracked, onRenderTriggered } from 'vue'
import type { Ref } from 'vue'

import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

console.log('counterStore', counterStore)
console.log('counterStore doubleCount', counterStore.doubleCount)

const props = defineProps<{
  msg: string
  bar?: string
}>()

const emits = defineEmits<{
  (e: 'change', name: string): void
  (e: 'update', value: string): void
}>()

const count = ref(0)

function trackChange(x: Ref<number>) {
  watch(x, x => {
    console.log('x 改变了！')
  })
}

// trackChange($$(count))

// onRenderTracked(event => {
//   debugger
// })

// onRenderTriggered(event => {
//   debugger
// })
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
      @click="count++"
    />

    {{ count }}

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <div>counterStore num2: {{ counterStore.counter }}</div>
      <div>doubleCount: {{ counterStore.doubleCount }}</div>

      <button @click="counterStore.increment()">counterStore</button>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
