<template>
    <div class="welcome-box">

      <transition name="transitionObj">
        <div v-if="true" class="bg">
          <!--<img src="../assets/bj1.jpg" width="100%" height="100%">-->
        </div>
      </transition>

      <transition name="transitionObj">
        <div v-if="true" class="menu" title="topicLists">
          <div class="pic" @click="closeWelcomePage">
            <img src="../assets/head.jpeg">
          </div>
        </div>
      </transition>
    </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        transitionObj: 'bounce',
        time: 0,
      };
    },
    computed : {
      ...mapGetters({
           topicLists: 'getTopicLists',
         })
    },
    methods : {
      closeWelcomePage() {
//        this.$dispatch('isShow', false);
        //自定义事件 ， 向父组件传递数据
        this.$emit('is-show-fun', false );
      }
    },
    beforeMount() {
      if (!this.$route.meta.isindex) {
        this.isShow = false;
        this.transitionObj = '';
        return false;
      }
      const self = this;
      setTimeout(() => {
        self.time = 1;
      }, 2000);


      console.log(this.transitionObj);

    },
    destroyed() {
      this.opacityStyle = 0;
    },
    watch : {
      topicLists : function (newVal, oldVal) { // eslint-disable-line object-shorthand
        if (newVal.length > oldVal.length) {
          if (!!this.time) {
//            this.$dispatch('isShow', false);
            //自定义事件 ， 向父组件传递数据
            this.$emit('is-show-fun', false );
            return false;
          }
          setTimeout(() => {
//            self.$dispatch('isShow', false);
            //自定义事件 ， 向父组件传递数据
            this.$emit('is-show-fun', false );
          }, 2000);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../assets/bj1.jpg") no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    .text{
      font-size: 20px;
      position: absolute;
      background: transparent;
      color: #fff;
      right: 15px;
      top: 15px;
      &:after{
        content: '...';
      }
    }
  }
  .menu{
    border-radius: 50%;
    width: 200px;
    height:200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;
    .pic{
      img{
        border-radius: 50%;
      }
      cursor: pointer;
      position: relative;
      left: 50%;
      top: 50%;
      margin-top: -25px;
      margin-left: -25px;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-size: 100%;
      transition: transform 2s;
      -webkit-transition: -webkit-transform 2s;
      &:hover{
        transform: rotate(360deg) scale(2)
      }
    }
    &>div:not(.pic){
      position: absolute;
      border-radius: 50%;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
