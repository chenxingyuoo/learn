<template>
  <div id="app">
    <h1 v-text="title"></h1>
                      <!-- 键修饰符，键别名 -->
    <input v-model="newItem" @keyup.enter="addNew">

    <ul>
     <li v-for="item in items" :class="[liClass, {finished : item.isFinished}]"
     @click="toggleFinished(item)">
          {{ item.label }}
     </li>
    </ul>
    <p>listen To My : {{ words }}</p>
    <components-a data="Parent component of the information" v-on:tell-me-something="listenToMy"></components-a>
  </div>

</template>

<script>



import Storage from './assets/js/storage'
import ComponentsA from './components/ComponentsA'

export default {
  data () {
    return {
      text : 'this text',
      title :　'<p>this is a todo list o! s</p>',
      items : Storage.fetch(),
      liClass : 'this-is-liClass',
      newItem : '',
      words : ''
    }
  },
  components : { ComponentsA },
  watch : {
    items : {
      handler (items) {
        //调用 Storage 模块的save方法 存到 localStorage
        Storage.save(items);
      },
      deep : true
    }
  },
  methods : {
      toggleFinished (item) {
        console.log(item)
        item.isFinished = !item.isFinished;
      },
      addNew (){
        console.log( this.newItem)
        this.items.push({
          label: this.newItem ,
           isFinished : true
         });
        this.newItem = '';
      },
      listenToMy (msg){
        this.words = msg;
      }
  }
}

// export default {} 相当于 new Vue({})

</script>

<style>
.finished{
  text-decoration: underline;
}
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}
#app li{
  cursor: pointer;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
