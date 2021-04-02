<template>
  <div class="content">
    <div class="panel">
      <div class="panel-header">
        <a  v-for="(tab, index) in topicTabs" :class="index === selected ? 'active' : ''" @click="topicTabsUpdate(index, tab.ename)">{{ tab.name }}</a >
      </div>
      <c-hint v-if="hint.show"></c-hint>
      <!--传数据到子组件-->
      <transition name="fade" v-else>
        <c-list :items='topicLists' ></c-list>
      </transition>
      <c-pagination v-if="!hint.show && topicLists && topicLists[0].author_id"></c-pagination>
    </div>
  </div>
</template>

<script>
  import cHint from '../components/Hint'
  import cList from '../components/List'
  import cPagination from '../components/Pagination'

  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
        return {
          selected: 0,
        };
    },
    components : {
      cHint,
      cList,
      cPagination
    },
    beforeMount(){
      console.log(this);
      // 初始化hint
      this.initHint();
      // 显示hint
      this.showHint();

      const topicListObject = {
        topicTab : 'all',
        currentPage : 1
      };

      // 获取文章列表
      this.fetchTopicLists(topicListObject);
//        .catch((e) => console.log(e));

    },

    computed: {
      ...mapGetters({
        hint : 'getHint',
        topicTabs: 'getTopicTabs',
        currentTab: 'getCurrentTab',
        topicLists : 'getTopicLists'
      })
    },

    methods : {
      ...mapActions([
        'initHint',
        'showHint',
        'customHint',
        'fetchTopicLists'
      ]),

      topicTabsUpdate(index, ename){
        debugger;
        // 初始化hint
        this.initHint();
        // 显示hint
        this.showHint();

        this.selected = index;

        const topicListObject = {
          topicTab : ename,
          currentPage : 1
        };
        // 获取文章列表
        this.fetchTopicLists(topicListObject)
//          .catch((e) => console.log(e));

      }
    }

  };
</script>

<style lang="scss" rel="stylesheet/scss">
    .content {
      float: left;
      width: 70%;
      min-height: 1px
    }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
  }

  @media (max-width: 512px) {
    .content {
      float: none;
      width: 100%;
    }
    .sider {
      float: none;
      width: 100%;
      padding-left: 0;
    }
  }



</style>
