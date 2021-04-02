<template>
  <div class="content">
    <spinner :show="loading"></spinner>

    <div class="article-box">
      <c-article></c-article>
      <c-comment></c-comment>
    </div>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue'
  import cArticle from '../components/Article.vue';
  import cComment from '../components/Comment.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
        return {
            loading : false
        };
    },
    components: {
      Spinner,
      cComment,
      cArticle
    },
    beforeMount(){

      this.loading = true;

      // 获取文章具体内容
      this.fetchTopic(this.$route.params.id)
        .then(()=>{
          this.loading = false;
        })
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

<style>
  .article-box{
    margin-top: 80px;
    margin-bottom: 15px;
  }
</style>
