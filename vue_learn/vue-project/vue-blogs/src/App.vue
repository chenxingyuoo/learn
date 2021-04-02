<template>
  <div id="app">
    <transition-group name="transitionObj">
      <div v-show="!isShow" :key="isShow">
        <!--<img src="./assets/logo.png">-->
        <!--<hello></hello>-->
        <c-header></c-header>
        <div class="main">
          <transition name="back" mode="out-in">
              <router-view class="main-wrapper"></router-view>
          </transition>
        </div>
        <c-footer></c-footer>
      </div>

      <welcome v-on:is-show-fun="isShowFun" v-if="isShow" @click="isShow" :key="isShowFun"></welcome>
    </transition-group>
  </div>

</template>

<script>
  //import Hello from './components/Hello';
  import cHeader from './components/header';
  import cFooter from './components/footer';
  import Welcome from './views/welcome';
  import store from './vuex/store';

  export default {
    name: 'app',
    components: {
//    Hello,
      cHeader,
      cFooter,
      Welcome
    },
    data () {
//      debugger;
      return {
        isShow: true,
        transitionObj: 'index',
      };
    },
    beforeMount() {
      if (!this.$route.meta.isindex) {
        this.isShow = false;
      }
      this.transitionObj = 'bounce';
      // 会变的 title
      /*document.addEventListener('visibilitychange', () => {
       document.title = document.hidden ? '出BUG了，快看！' : 'cleartime的博客_web前端技术博客';
       });*/

      // 控制台
      try {
        console.log('%cfollow me %c https://github.com/cleartime', 'color:red', 'color:green');
      } catch (e) {
        console.log(e);
      }
    },
    store,
    methods: {
      isShowFun (msg){
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        this.isShow = msg;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var FastClick = require('./assets/js/fastclick.js');
    FastClick.attach(document.body);
  }, false);

</script>

<style lang="scss" rel="">
  html,
  #app {
    -webkit-overflow-scrolling: touch;
    line-height: 1.6em;
    word-spacing: .05em;
    letter-spacing: .05em;
    height: 100%;
    width: 100%;
    text-rendering: optimizeLegibility;
  }

  body {
    height: 100%;
    background-color: #fff;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #34495e;
    margin: 0;
  ::selection {
    color: #00b0e8;
    background: #000000;
  }
  }

  img[src^="http"]:empty::before {
    content: attr(src, 'http://pic.qiantucdn.com/58pic/15/36/43/60d58PICgBI_1024.jpg');
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    color: #CCC;
    text-decoration: none;
  }

  img {
    vertical-align: middle;
    max-width: 100%;
  }

  .main {
    overflow: hidden;
    padding: 2em 1.4em 0;
    max-width: 1000px;
    margin: 0 auto;
  }

  .back-transition {
    transition: all .5s ease;
  }

  .back-enter-active {
    opacity: 0;
    transition: all .5s ease;
    transform: translateY(-100%);
  }

  .back-leave-active {
    opacity: 0;
    transition: all .5s ease-in-out;
    transform: translateY(-100%);
  }

  .fade-transition {
    transition: all .5s ease-in-out;
  }

  .fade-enter-active {
    opacity: 0;
    transition: all .5s ease;
  }

  .fade-leave-active {
    opacity: 0;
    transition: all .5s ease-in-out;
  }

  /*.search-transition {
    transition: all .5s ease;
  }

  .search-enter-active{
    transition: all .5s ease;
    transform: translateX(100%);
  }
  .search-leave-active{
    transition: all .5s ease;
    transform: translateX(100%);
  }*/
  .search-enter-active {
    transition: all .3s ease;
  }
  .search-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .search-enter, .search-leave-active {
    padding-left: 10px;
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in 2s ease;
  }

  .bounce-leave-active {
    animation: bounce-out 2s ease;
  }

  @keyframes bounce-out {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  .index-enter-active, .index-leave-active {
    animation: index 2s ease;
  }

  @keyframes index {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 2s ease;
    opacity: 0;
    transform: translateY(30px);
  }


  @media screen and (max-width: 768px) {
    .main {
      padding: 0;
      font-weight: bold;
    }
  }
</style>
