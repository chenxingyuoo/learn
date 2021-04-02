<template>
  <div id="main">
    <button id="delay1" v-bind:class="[delay_flag?'green':'red']"></button>
    <button id="delay2" v-bind:class="[delay_flag?'green':'red']"></button>
    <button id="delay3" v-bind:class="[delay_flag?'green':'red']"></button>
    <button id="delay4" v-bind:class="[delay_flag?'green':'red']"></button>
    <span id="delay_flag">{{get_delay}}ms</span>
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
  },
  computed:{
    delay_flag(){
      return this.get_delay<60
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  padding:0 0;
  margin:0 0;
}

#main {
  width:500px;
  margin: 0 auto;
  height: 100%;
}

.green {
  background-color:#86e468;
}

.red {
  background-color:red;
}

#delay1 {
  padding:0 0;
  width:5px;
  height:5px;
  border-radius: 50%;
  border:none;
}

#delay2 {
  padding:0 0;
  width:7px;
  height:7px;
  border-radius: 50%;
  border:none;
}

#delay3 {
  padding:0 0;
  width:9px;
  height:9px;
  border-radius: 50%;
  border:none;
}

#delay4 {
  padding:0 0;
  width:11px;
  height:11px;
  border-radius: 50%;
  border:none;
}

 #delay_flag {
  font-size:5px;
 }
</style>