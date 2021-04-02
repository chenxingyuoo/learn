<template>
  <header>
    <router-link :to="{name: 'all' }" class="brand">
      <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="cnodejs-logo">
    </router-link>
    <ul class="navbar">
      <li>
        <router-link :to="{name: 'all' }">首頁</router-link>
      </li>
      <li >
        <a v-if="!token">登入</a>
        <a v-else>未读消息<span class="h"  v-if="msgCount">{{ msgCount }}</span></a>
      </li>
      <li><a href="#" @click.prevent.stop="exit">退出</a></li>
    </ul>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
        return {

        };
    },
    beforeMount (){
      console.log(this);
    },
    computed: {
      ...mapGetters({
        token: 'getToken',
        msgCount: 'getMsgCount',
      })
    },
    methods: {
      // 退出
      exit() {
        /*this.delToken();
        this.$route.router.go({ name: 'index' });*/
      },
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  header {
    overflow: hidden;
    background-color: #444;
    padding: 0 5%;
    margin-bottom: 20px;
    position: fixed;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1)
  }

  .brand {
    float: left;
    width: 120px;
    height: 28px;
    padding: 5px 20px;
  }

  .navbar {
    float: right;
    overflow: hidden;
    display: block;

  li {
    float: left;
  }

  a {
    font-size: 13px;
    display: block;
    padding: 16px;
  }
  }

  .h {
    background-color: #80BD01;
    height: 14px;
    min-width: 14px;
    padding: 0 2px;
    padding-top: 1px;
    margin-left: 1px;
    display: inline-block;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    border-radius: 10px;
    color: #FFF;
  }

  @media (max-width: 400px) {
    .brand {
      float: none;
      margin: 0 auto;
      display: block;
    }

    .navbar {
      float: none;
      text-align: center;

    li {
      float: none;
      display: inline-block;
    }
  }
  }
</style>
