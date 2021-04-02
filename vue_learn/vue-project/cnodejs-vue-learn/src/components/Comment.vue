<template>
  <div class="panel" v-if="topic.reply_count !== 0">
    <div class="panel-header">
      {{ topic.reply_count }}条评论
    </div>
    <div class="inner padding" v-for="reply in topic.replies">
      <div class="author-content">
        <router-link :to="{name: 'user', params: {name: reply.author.loginname}}">
          <img :src="reply.author.avatar_url" alt="avatar">
        </router-link>
        <div class="author-info">
          <router-link :to="{name: 'user', params: {name: reply.author.loginname}}">{{ reply.author.loginname }}</router-link>
          <span>{{reply.create_at | timeToNow }}</span>
          <div class="user-action">
            <a @click.prevent.stop="toStar(reply)"><i class="fa fa-thumbs-o-up"></i> {{ reply.ups.length }}</a>
            <a @click.prevent.stop="replyOne(reply)"><i class="fa fa-reply"></i></a>
          </div>
        </div>
      </div>
      <div class="comment-content markdown-body" v-html="reply.content"></div>
    </div>
  </div>
</template>

<script>
  const MarkdownIt = require('markdown-it');
  import cHint from '../components/Hint.vue';
  import { mapGetters , mapActions } from 'vuex';
    export default {
      data() {
        return {
          editor: '',
          rid: '',
        };
      },
      beforeMount(){
        // 初始化hint
        this.initHint();
        debugger;
        if (this.token) {
          this.editor = new Editor();
          this.editor.render();
        }
      },
      computed: {
        ...mapGetters({
          hint: 'getHint',
          topic: 'getTopic',
          token: 'getToken',
          loginUser: 'getLoginUser',
        })
      },
      methods: {
        ...mapActions([
          'star',
          'reply',
          'initHint',
        ]),

        toStar(r){
          const starObject = {
            replyId : r.id,
            token : this.token
          };
          this.star(starObject)
            .then((v) => {
              if (v === 'up') {
                r.ups.push(reply.id);
              }
              if (v === 'down') {
                // 随便移除一个值，让 reply.ups.length - 1
                r.ups.pop();
              }
            })
            .catch((e) => console.log(e));
        }
      }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .author-content {
    font-size: 12px;
    & > a {
      float: left;
    }
  }

  .author-info {
    height: 30px;
    line-height: 30px;
    margin-left: 40px;

    span {
      color: #08C;
    }

  }

  .user-action {
    float: right;
    a {
      margin: 0 5px;
      color: #AAA;

      &:hover {
        color: #333;
      }
    }
  }

  .comment-content {
    margin-left: 30px;
  }
</style>
