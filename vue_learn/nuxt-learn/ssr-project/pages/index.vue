<!--
 * @Description: 这是***页面
 * @Date: 2022-09-23 11:48:52
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
-->
<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        ssr-project: {{ ip }}
      </h1>
      <h2 class="subtitle">
        My stunning Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
        <router-link to="/preview" class="button--grey">Preview</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  async asyncData({  $http }) {
    const ip = await $http.$get('http://icanhazip.com')
    console.log('ip', ip);
    return { ip }
  },
  components: {
    Logo
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
