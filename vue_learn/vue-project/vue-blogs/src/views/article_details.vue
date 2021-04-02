<template>
  <div class="article-details">
    <c-hint v-if="hint.show"></c-hint>
    <template v-if="topic && !hint.show">
      <c-article></c-article>
      <c-comment :comment = 'comment' :topic = 'topic.objectId' ></c-comment>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import cHint from '../components/hint';
  import cArticle from '../components/article';
  import cComment from '../components/comment';

  export default {
    data() {
        return {};
    },
    components : {
      cHint,
      cArticle,
      cComment
    },
    computed : {
      ...mapGetters({
        topic: 'getTopic',
        hint: 'getHint',
        searchType: 'getSearch',
        comment: 'getComments',
        fileId: 'getFileId',
      }),
    },
    methods : {

      ...mapActions(
        [
          'fetchTopic' ,
          'initHint' ,
          'showHint' ,
          'fetchImg' ,
          'fetchComments'
        ]),
    },
    created() {


      // 初始化hint
      this.initHint();
      // 显示hint
      this.showHint();
      // 获取文章具体内容
      /* eslint-disable no-console, prefer-arrow-callback,
       space-before-function-paren, space-before-blocks */
      const self = this;
      this.fetchTopic(this.$route.params.id)
        .then(function(){
//          debugger;
          // 获取文章图片
          if (self.fileId) {
            self.fetchImg(self.fileId)
              .then()
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
//      debugger;
      // 获取文章评论
      this.fetchComments(this.$route.params.id)
        .then()
        .catch((e) => console.log(e));
    },


  };
</script>

<style lang="scss" scoped>
  .article-details {
    float: left;
    width: 100%;
    min-height: 1px;
    .panel {
      display: inline-block;
      float: left;
      width: 100%;
      padding-bottom: 30px;
      border-bottom: 1px solid #ccc;
      a {
        display: block;
        &.v-link-active {
           color: #0000AA;
         }
      }
    }
    .content-list {
      display: inline-block;
      box-shadow: 0 0 5px #CCC;
      border-radius: 5px;
      float: right;
    }
  }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
    display: none;
  }

  @media screen and (max-width: 768px){
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
