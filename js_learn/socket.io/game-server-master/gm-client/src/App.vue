<template>
  <div id="main">
    <span>延时:{{get_delay}}</span>
    <router-view></router-view>
  </div>
</template>
<script>
import {get_delay} from './vuex/getters'
import {connect} from './vuex/actions'
import store from './vuex/store';

export default {
  store,
  vuex:{
    getters:{
      get_delay
    },
    actions:{
      connect
    }
  },
  ready(){
    this.connect()
  }
}
</script>

<style>
html {
  height: 100%;
}

</style>
