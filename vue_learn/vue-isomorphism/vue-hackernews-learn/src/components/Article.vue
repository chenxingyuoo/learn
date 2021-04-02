<template>
  <article class="panel">
    <div class="article-header">
      <h2>
        <span class="top" v-if="topic.top">置顶</span>
        <span class="top" v-else-if="topic.good">精华</span>
        {{ topic.title }}
      </h2>
      <div class="info">
        <span>发布于{{ topic.create_at | timeToNow }}</span>
        <span>作者{{ topic.author && topic.author.loginname }}</span>
        <span>{{ topic.visit_count }}次浏览</span>
        <span>来自 {{ topic.tab | transTab }}</span>
        <div v-if="token">
          <div class="btn btn-success" v-if="!inCollection" @click.prevent.stop="collect">收藏</div>
          <div class="btn btn-failure" v-else @click.prevent.stop="deCollect">取消收藏</div>
        </div>
      </div>
    </div>
    <div class="markdown-body" v-html="topic.content"></div>
  </article>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
        return {};
    },
    computed: {
      ...mapGetters({
        topic: 'getTopic',
        inCollection: 'getCollectStatus',
        token: 'getToken',
      })
    },
    beforeMount(){
      console.log(this);
    },
    methods : {
      ...mapActions([
        'addCollection',
        'changeCollectStatus',
        'deCollection',
        'fetchCollection',
      ]),
      // 收藏
      collect() {
        const collectionObiect = {
          id : this.topic.id,
          token : this.token
        };
        this.addCollection(collectionObiect)
          .then(this.changeCollectStatus(true))
          .catch((e) => console.log(e));
      },
      // 取消收藏
      deCollect() {
        const collectionObiect = {
          id : this.topic.id,
          token : this.token
        };
        this.deCollection(collectionObiect)
          .then(this.changeCollectStatus(false))
          .catch((e) => console.log(e));
      },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/lib/github-markdown.css';
  .article-header {
    background-color: #FFF;
    border-bottom: 1px solid #E5E5E5;
    font-size: 0.9em;
    /* padding: 10px; */
    border-radius: 3px 3px 0 0;
    padding: 15px 5%;
  }
  .info {
    color: #838383;
    font-size: 12px;
  span {
  &:before {
     content: '•';
   }
  }

  a {
    color: #FFF;
    margin: 5px 0;

  &:hover {
     color: #FFF;
   }

  }

  }

  .btn-failure {
    background-color: #909090;
    color: #000;
  }

  .panel
     margin 15px 0


  .markdown-body {
    padding: 0 15px;
    background-color #fff
  img {
    max-width: 100%;
    width: auto;
    height: auto;
  }
  }
</style>
