<template>
  <c-hint v-if="hint.show"></c-hint>
  <nav class="pagination" v-else>
    <a class="pre"  v-if="currentPage > 1" @click="toTopicLists('pre')">上一页</a>
    <a class="next" @click="toTopicLists('next')">下一页</a>
  </nav>
</template>

<script>
  import cHint from '../components/Hint'
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
        return {};
    },
    components : {
      cHint,
    },
    beforeMount (){
      console.log(this);
    },
    computed: {
      ...mapGetters({
        hint : 'getHint',
        topicTabs: 'getTopicTabs',
        currentTab: 'getCurrentTab',
        topicLists : 'getTopicLists',
        currentPage: 'getCurrentPage'
      })
    },
    methods : {

      ...mapActions([
        'initHint',
        'showHint',
        'customHint',
        'fetchTopicLists'
      ]),

      //分页
      toTopicLists(type){

        //回到顶部
        document.body.scrollTop = 0;

        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();

        const currentPage =  this.currentPage;
        const newPage = type === 'pre' ? currentPage - 1 : currentPage + 1;
        const topicListObject = {
          topicTab : this.currentTab,
          currentPage : newPage
        };
        // 获取文章列表
        this.fetchTopicLists(topicListObject)
          .catch((e) => console.log(e));
      },

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .pagination {
    overflow: hidden;
    padding: 10px;
    font-size: 10px;
    margin: 0 auto;
    background-color: #fff;

  a {
    border: 1px solid #DDD;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;

  &:hover {
     background-color: #F5F5F5;
   }
  }
  }

  .pre {
    float: left;
  }

  .next {
    float: right;
  }
</style>
