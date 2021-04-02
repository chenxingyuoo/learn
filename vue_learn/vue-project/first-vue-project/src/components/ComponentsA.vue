<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="onClickMe">open mouse</button>
  </div>
</template>

<script>
let num  = 0;
export default {
  data () {
    return {
      msg: `Hello form component a `,
    }
  },
  props : [ 'data' ], // 向父组件获取数据
  methods : {
    onClickMe () {
      console.log(this.data)
      num++;
      //自定义事件 ， 向父组件传递数据
      this.$emit('tell-me-something', this.msg + num );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
