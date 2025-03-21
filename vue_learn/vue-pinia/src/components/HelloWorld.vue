<!--
 * @Description: 这是***页面
 * @Date: 2022-09-04 14:01:03
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
-->
<script setup lang="ts">
import { withDefaults, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

const props = withDefaults(
  defineProps<{
    msg: string
  }>(),
  {
    msg: '123'
  }
)

const color = ref('red')

const changeColor = () => {
  color.value = 'blue'
}
</script>

<template>
  <div class="greetings" :class="color">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>. What's next?
    </h3>

    <div>counterStore: {{ counterStore.counter }}</div>

    <div :class="$style.color">color</div>
    <button @click="changeColor">changeColor</button>
  </div>
</template>

<style>
:root {
  --color: red;
}
.greetings.blue {
  --color: blue;
}
</style>

<style module>
.color {
  color: var(--color);
}
</style>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
