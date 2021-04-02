<template>
  <div class="back-top" v-show="show">
    <a href="#" @click.prevent.stop="toTop">回到顶部</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    beforeMount(){      //在挂载开始之前被调用：相关的 render 函数首次被调用。
      window.onscroll = () => {
        if (document.body.scrollTop > 400) {
          this.show = true;
        } else {
          this.show = false;
        }
      };
    },
    beforeDestory() {    //实例被摧毁之前调用
      window.onscroll = null;
    },
    methods : {
      toTop(){
        document.body.scrollTop = 0;
      }
    }

  };
</script>

<style lang="scss">
  .back-top {
    padding: 8px 5px 8px 8px;
    border-radius: 8px 0 0 8px;
    position: fixed;
    right: 0;
    bottom: 98px;
    width: 16px;
    background-color: #FFF;
  }
</style>
