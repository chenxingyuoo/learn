<template>
  <div id="app">


    <c-header></c-header>

    <div class="main">
      <router-view class="main-wrapper"></router-view>
    </div>

    <c-footer></c-footer>
    <c-back></c-back>
  </div>
</template>

<script>
import cHeader from './components/Header'
import cFooter from './components/Footer'
import cBack from './components/backTop';

export default {
  name: 'app',
  components: {
    cHeader,
    cFooter,
    cBack
  },
}
</script>

<style lang="scss">


  *{
    padding: 0;
    margin: 0;
  }
  html,
  #app {
    height: 100%;
  }

  body {
    height: 100%;
    font: 16px 'Microsoft YaHei', 微软雅黑, STHeiti, 'WenQuanYi Micro Hei', SimSun, sans-serif;
    background-color: #E1E1E1;
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
    padding: 0 5%;
    min-height: 100%;
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


</style>
