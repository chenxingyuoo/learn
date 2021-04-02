<template>
  <div class="container">
    <h1>User Agent</h1>
    <p>{{ userAgent }}</p>
    <p><nuxt-link to="/posts">Blog</nuxt-link></p>


    <button @click="increment">{{ counter }}</button>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    asyncData: ({ req }) => {
      return {
        userAgent: (req ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'No user agent (generated)'))
      }
    },
    computed: mapState([
      'counter'
    ]),
    methods : {
      increment() {
        this.$store.commit('increment')
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 70%;
    margin: auto;
    text-align: center;
    padding-top: 100px;
  }
  p {
    font-size: 20px;
  }
  a {
    color: #41B883;
  }
</style>
