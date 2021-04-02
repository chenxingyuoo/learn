<template>
  <div class="content">
    <c-hint v-if="hint.show"></c-hint>
    <template v-if="topic && !hint.show">
      <c-article></c-article>
      <c-comment></c-comment>
    </template>
  </div>
</template>

<script>
  import cHint from '../components/Hint';
  import cArticle from '../components/Article';
  import cComment from '../components/Comment';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data() {
        return {

        };
    },
    components: {
//      cSiderbar,
//      cArticle,
      cHint,
      cComment,
      cArticle
    },
    beforeMount(){
      console.log(this);

      // 初始化hint
      this.initHint();
      // 显示hint
      this.showHint();

      // 获取文章具体内容
      this.fetchTopic(this.$route.params.id)
        .then(this.fetchUser)
        .catch((e) => console.log(e));

      // 如果文章id存在于收藏列表中，将收藏状态设置为true.从而显示取消收藏按钮。。不存在则显示收藏按钮
     /* if (this.collection.has(id)) {
        this.changeCollectStatus(true);
      } else {
        this.changeCollectStatus(false);
      }
*/
    },

    computed: {
      ...mapGetters({
        hint : 'getHint',
        topicTabs: 'getTopicTabs',
        currentTab: 'getCurrentTab',
        topicLists : 'getTopicLists',
        token: 'getToken',
        topic : 'getTopic'
      })
    },

    methods : {
      ...mapActions([
        'initHint',
        'showHint',
        'customHint',
        'fetchTopic',
        'changeCollectStatus'
      ]),
    }
  };
</script>

<style lang="" rel="stylesheet/">

</style>
